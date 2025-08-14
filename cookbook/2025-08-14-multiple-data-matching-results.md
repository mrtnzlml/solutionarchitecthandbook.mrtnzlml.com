---
title: Multiple data matching results
slug: multiple-data-matching-results
authors: [mrtnzlml, VaclavRut]
tags: [master-data-hub, rossum-formulas]
---

import QuizComponent from '@site/src/components/QuizComponent';

Data matching (Master Data Hub; MDH) results are by default returned into an "enum" field in Rossum (also known as "Options" field). Enum field allows to select only one of the values returned (it behaves as a regular [HTML select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select) with options). What if you need to select multiple values, however?

<!-- truncate -->

The solution is to return all values into a **hidden** enum field and later process the data using a simple serverless function. In our example, the hidden field is `order_id_match`:

```python
from txscript import TxScript, default_to, substitute


def rossum_hook_request_handler(payload):
    x = TxScript.from_payload(payload)

    # Do not recalculate if the input data has not changed
    # (add more fields depending on the input into your MDH query):
    recalculate_hash = f"{x.field.order_id}__{x.field.grn_id}"
    if x.field.recalculate_hash == recalculate_hash:
        return x.hook_response()

    # Get all valid enum options (result of the MDH query):
    order_line_options = default_to(x.field.order_id_match.attr.options, [])
    valid_options = [
        opt for opt in order_line_options if opt.value
    ]

    # Clear existing multivalue table:
    x.field.order_id_lines = []

    # Create new multivalue table:
    new_lines = []
    for option in valid_options:
        new_lines.append({
            "order__id": option.value
            # What about other columns? Keep reading. :)
        })

    # Insert new values into the multivalue table:
    x.field.order_id_lines = new_lines
    x.field.recalculate_hash = recalculate_hash

    return x.hook_response()
```

The function does the following:

1. Get all valid options from the `order_id_match` enum field.
2. Clear the existing `order_id_lines` table (our destination).
3. Insert the enum values into the `order_id_lines` destination table.

Additionally, it takes care of recalculating the table lazily so users can update the final table manually if needed (see the `recalculate_hash` field).

This way, all data matching results were populated into multivalue table despite the data matching supporting only enum fields.

Note that it might be a good idea to lazily load additional values in the table. In real-world solution, the chain of hooks would look like this:

```text
.---------.      .--------------------------.      .---------.
|  MDH 1  | ---> |  Custom hook from above  | ---> |  MDH 2  |
`---------`      `--------------------------`      `---------`
```

This way, we can distribute only row IDs from the first MDH extension and load the actual data in the second MDH extension. Alternatively, we could populate all the data in the first MDH hook. That is however a bit laborious when there are many columns to populate and distribute.

<QuizComponent
question="Can master data hub extension return values to a string field?"
answers={[
{ text: 'Yes, MDH can return values into any preconfigured field' },
{ text: 'No, only enum fields are supported', isCorrect: true }
]}>
The only field type that Master Data Hub (MDH) extension supports are `enum` fields. Enum fields limit the section to only one specific value. However, we can still access all the values (options) using the `x.field.order_id_match.attr.options` code which can later be distributed into a multivalue table. 
</QuizComponent>
