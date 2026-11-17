---
title: Legislative Information Extraction
type: concept
aliases:
  - Legal Provision Extraction
definition: "Using linguistic structure and legal classification rules to identify provision types, actors, and actions in legislative text."
tags:
  - text-as-data
  - legislative-politics
  - information-extraction
---

## Overview

Legislative information extraction converts statutory language into structured observations about legal authority. Dependency relations preserve actors, grammatical voice, and negation, while domain rules map these features into categories such as delegation, constraint, permission, and entitlement.

## Key Ideas

- Actor identification distinguishes authority assigned to an official from mere mentions of that official.
- Modal verbs alone do not identify legal function: negation, voice, and specialized verbs can change the category.
- Extracted provisions and political constructs are distinct. Provision counts proxy legislative detail; actor-specific delegation counts can be discounted by constraints to operationalize executive delegation.
- Human validation should be category-specific. Stronger agreement for delegations does not validate constraints equally well.
- Legal-domain rules rely on linguistic conventions and require reassessment before transfer to other genres or institutions.

## Important Papers

- [[papers/measuring-discretion-and-delegation-in-legislative-texts-methods-and-application-to-us-states|Measuring Discretion and Delegation in Legislative Texts: Methods and Application to US States]]: defines four provision categories and applies them to legislative detail and gubernatorial delegation; validation exposes substantially weaker agreement for constraints.

## Related Concepts

- [[concepts/semantic-role-based-narrative-mining|Semantic Role-Based Narrative Mining]]: also preserves actor–action relationships, but extracts narrative statements rather than classifying statutory authority.
