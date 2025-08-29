---
title: 3 things you need to know about Reasoning Fields
slug: three-things-you-need-to-know-about-reasoning-fields
authors: [mrtnzlml]
tags: [reasoning-fields]
---

import QuizComponent from '@site/src/components/QuizComponent';

Rossum.ai recently introduced a new field type: **[Reasoning Fields](https://knowledge-base.rossum.ai/docs/reasoning-fields)** (inline LLM fields). Here is all you need to know about them from a Solution Architect:

1. Reasoning Fields are designed to output "single value" predictions. It's better to have **many specialized fields** than one that solves many problems simultaneously. Parsing address? Create one Reasoning Field per address chunk (as opposed to having one fields that resolves all the chunks at once).
1. Reasoning Fields **remember previous predictions** and manual changes (rather aggressively!). Same inputs are likely to return the same output even when the prompt or the underlying model changes. Currently, the best way to overwrite this is by introducing a "cache buster" field.
1. Reasoning Fields are LLM-based. Naturally, like any other LLM, they are not a good fit for tasks requiring **accuracy** or **reproducibility**. While reproducibility is solved by the caching mentioned above, accuracy is still a problem. Favor [Formula Fields](https://knowledge-base.rossum.ai/docs/formula-fields-in-rossum) for deterministic outputs where possible (such as mathematical calculations).

<!-- truncate -->

OK, so how do you use Reasoning Fields? In your queue settings, add a new field of type "Reasoning" and configure it as you like. For example, here is a prompt that determines the country code from the input address (`sender_address`):

```text
Please follow these instructions precisely.

### **1. General Instructions**

Provide a single, three-letter, uppercase **ISO 3166-1 alpha-3** country code for the provided address string. The response must contain only this code, with no additional text, explanation, or punctuation.

### **2. Field Instructions and Logic**

- **`sender_address`**: The input is a string representing a physical address.
- **Logic**:
    - Identify the country from the `sender_address`.
    - If the country is explicitly mentioned (e.g., "USA", "United Kingdom"), use that to determine the alpha-3 code.
    - If the country is missing, infer the country from contextual clues such as the city, postal code, or regional language conventions.
    - **Exclude/Ignore**: Do not consider the name of the street or the building number for country identification.
    - If, after all attempts at inference, the country remains ambiguous or unidentifiable, return the fallback code.

### **3. Fallback and Output Format**

- The output must be exactly three uppercase letters.
- **`output_format`**: `[ISO 3166-1 alpha-3 code]`
- If the country cannot be determined, the output must be **"UNK"** (Unknown).

### **4. Examples**

| Input Address | Output |
| :--- | :--- |
| 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA | USA |
| 10 Downing Street, London SW1A 2AA | GBR |
| Křižíkova 148/34, 186 00 Karlín, Czech Republic | CZE |
```

Protip: do not rely on the model's output to be correct, always verify it if possible. For example, the above prompt should clearly return a three-letter code, so you can write a validation rule that makes sure that the output conforms to the specification (and the ISO code actually exists). This way you make sure that the user-confirmed data is always correct. In return the future predictions will be more accurate.

<QuizComponent
question="Which LLM API powers Reasoning Fields?"
answers={[
{ text: 'Anthropic (Claude)' },
{ text: 'ChatGPT' },
{ text: 'Gemini PRO' },
{ text: 'Grok' },
{ text: 'In-house LLM', isCorrect: true }
]}>
Reasoning Fields are powered by an in-house LLM model that is self-hosted within the Rossum infrastructure, so it does not connect with any external source outside of Rossum's walls.
</QuizComponent>

Note that Reasoning Fields are still in beta and are subject to change. Get in touch with your Rossum representative if you have any questions or concerns.
