---
sidebar_position: 2
sidebar_label: 'Alternative Python solution'
title: 'Line items grouping: Alternative Python solution'
---

# Alternative Python solution

Consider using the following simple Python code (as a [serverless function](../rossum-formulas/serverless-functions.md)) that replaces the whole functionality of this extension (no need for any webhook):

```py
from rossum_python import RossumPython, is_empty, default_to, is_set


def sum_values(values):
    """Sums values if there are any, otherwise returns an empty string (not zero)."""
    return sum(v for v in values if is_set(v)) if any(is_set(v) for v in values) else ''


def rossum_hook_request_handler(payload):
    """Group and sum VAT rows by rate, copying into export field."""
    x = RossumPython.from_payload(payload)

    # Reset the target table:
    x.field.tax_details_export = []

    vat_rate_groups = {}

    for row in x.field.tax_details:
        vat_rate = row.tax_detail_rate_normalized.attr.value

        if vat_rate not in vat_rate_groups:
            vat_rate_groups[vat_rate] = {
                'tax_detail_base_export': [],
                'tax_detail_tax_export': [],
                'tax_detail_total_export': [],
                'tax_detail_description_export': row.tax_detail_description
            }

        vat_rate_groups[vat_rate]['tax_detail_base_export'].append(row.tax_detail_base_normalized)
        vat_rate_groups[vat_rate]['tax_detail_tax_export'].append(row.tax_detail_tax_normalized)
        vat_rate_groups[vat_rate]['tax_detail_total_export'].append(row.tax_detail_total_normalized)

    for rate, values in vat_rate_groups.items():
        x.field.tax_details_export.append({
            'tax_detail_rate_export': rate,
            'tax_detail_base_export': sum_values(values['tax_detail_base_export']),
            'tax_detail_tax_export': sum_values(values['tax_detail_tax_export']),
            'tax_detail_total_export': sum_values(values['tax_detail_total_export']),
            'tax_detail_description_export': values['tax_detail_description_export'],
        })

    return x.hook_response()
```

Alternatively, you can use `pandas` to do the same thing (note however, that it can have a performance impact since `pandas` is a heavy dependency):

```py
import pandas as pd
from txscript import TxScript, is_empty, default_to, is_set


def sum_values(values):
    """Sums values if there are any, otherwise returns an empty string (not zero)."""
    return sum(v for v in values if is_set(v)) if any(is_set(v) for v in values) else ''


def rossum_hook_request_handler(payload):
    t = TxScript.from_payload(payload)

    # Reset the target table:
    t.field.line_items_grouped = []

    # Collect all relevant data:
    data = []
    for row in t.field.line_items:
        data.append({
            "item_rate_grouped": row.item_rate.attr.value,  # Must use attr.value because of the `groupby` call!
            "item_description_grouped": row.item_description,
            "item_total_base_grouped": row.item_total_base,
            "item_tax_grouped": row.item_tax,
            "item_amount_total_grouped": row.item_amount_total,
        })

    # Group the data if any:
    if len(data) > 0:
        # https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html
        t.field.line_items_grouped = (
            pd.DataFrame(data)
            .groupby('item_rate_grouped')
            .agg({
                "item_description_grouped": "first",
                "item_total_base_grouped": sum_values,
                "item_tax_grouped": sum_values,
                "item_amount_total_grouped": sum_values
            })
            .reset_index().to_dict("records")
        )

    return t.hook_response()
```
