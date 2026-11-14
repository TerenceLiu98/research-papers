---
title: "Ontology-Grounded LLM Personas"
type: concept
tags:
  - llm-personas
  - ontologies
---

## Overview

Ontology-grounded personas represent the identity and behaviour of an LLM-enacted entity using explicit classes, properties, and controlled vocabularies. An instance can be serialized as structured prompt context while retaining a schema for inspection, comparison, and editing.

## Key Ideas

- Separate stable identity attributes from behavioural dispositions, goals, preferences, and constraints.
- Reuse established vocabularies for people, events, provenance, and controlled terms; use literal fields as fallbacks.
- Distinguish schema coverage from extraction fidelity and downstream enactment. A schema may support an attribute that extraction misses, and a complete representation may still change generated behaviour.
- Evaluate individual fidelity dimensions: similar aggregate scores can conceal improved constraint adherence alongside degraded communication style.

## Important Papers

- [[formalising-personas-for-large-language-models-an-ontological-approach|Formalising Personas for Large Language Models: An Ontological Approach]] introduces an Identity–Behaviour ontology and compares ontology-grounded YAML with natural-language persona prompts on PersonaGym.

## Related Concepts

- [[ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]] similarly uses a schema to constrain information extraction; persona grounding additionally evaluates how extracted instances condition generated behaviour.
