---
title: 'Automation: Automation unblocker'
sidebar_label: 'Automation unblocker'
sidebar_position: 1
---

# Automation unblocker

Unblocks specified datapoints when conditions are met.

## Source code

```py
from txscript import TxScript
from typing import Callable, Dict, Iterator, List
from pydantic import BaseModel


class FieldConfig(BaseModel):
    check_field: str
    fields_to_automate: List[str]


class Settings(BaseModel):
    value_existence: List[FieldConfig] = []
    single_option: List[FieldConfig] = []


def rossum_hook_request_handler(payload: dict) -> Dict[str, list]:
    settings = Settings.parse_obj(payload["settings"])
    content = payload["annotation"]["content"]

    operations = []

    for config in settings.value_existence:
        automation_ops = automate(
            config,
            content,
            lambda dp: dp["content"]["value"] != "",
        )
        operations.extend(automation_ops)

    for config in settings.single_option:
        automation_ops = automate(
            config,
            content,
            lambda dp: len(dp.get("options",[])) == 1 and dp["content"]["value"] != "",
        )
        operations.extend(automation_ops)

    return {"operations": operations}


def automate(
    config: FieldConfig,
    content: List[dict],
    condition: Callable[[dict], bool],
) -> List[dict]:
    operations = []
    for datapoint in find_all_by_schema_id(content, config.check_field):
        if condition(datapoint):
            for schema_id in config.fields_to_automate:
                for automated_dp in find_all_by_schema_id(content, schema_id):
                    operations.append(create_automation_operation(automated_dp))
    return operations



def create_automation_operation(
    datapoint: dict,
    automation_type: str = "connector",
) -> dict:
    """
    Enable automation of a specific field by updating its validation sources.
    :param datapoint: content of the datapoint
    :param automation_type: type of the automation validation source to be used
    :return: dict with replace operation definition (see https://api.elis.rossum.ai/docs/#annotation-content-event-response-format)
    """
    validation_sources = datapoint["validation_sources"]

    if automation_type not in validation_sources:
        validation_sources.append(automation_type)

    return {
        "op": "replace",
        "id": datapoint["id"],
        "value": {"validation_sources": validation_sources},
    }


def find_all_by_schema_id(content: List[dict], schema_id: str) -> Iterator[dict]:
    for node in content:
        if node["schema_id"] == schema_id:
            yield node
        elif children := node.get("children"):
            yield from find_all_by_schema_id(children, schema_id)
```

## Example configuration

```json
{
  "single_option": [
    {
      "check_field": "order_header_match",
      "fields_to_automate": ["order_id"]
    }
  ]
}
```
