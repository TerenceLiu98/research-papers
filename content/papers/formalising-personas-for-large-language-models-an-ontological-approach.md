---
title: "Formalising Personas for Large Language Models: An Ontological Approach"
type: paper
authors:
  - Andrea Sillano
  - Pasquale Lisena
  - Raphaël Troncy
  - Luigi De Russis
year: null
tags:
  - llm-personas
  - ontologies
  - persona-evaluation
---

## TL;DR

An OWL ontology separates LLM persona identity from behaviour, making attributes explicitly editable and inspectable. On 200 PersonaGym personas, ontology-grounded YAML achieves a similar overall PersonaScore to natural language (3.6249 versus 3.6604), with better Toxicity Control but worse linguistic habits, justification, and consistency. High attribute coverage does not imply uniformly preserved enactment.

## Research Question

Can an interoperable, ontology-grounded persona representation preserve downstream persona enactment while making identity and behavioural attributes explicit?

## Motivation

Narrative persona prompts leave attributes implicit and inconsistently organized. Existing person and user-model vocabularies do not fully capture the behavioural constraints and tool-use preferences needed for LLM enactment.

## Contributions

- An OWL ontology with 7 new classes, 91 properties, and 86 controlled concepts across 12 SKOS schemes.
- An Identity–Behaviour organization reusing schema.org, FOAF, BIO, PROV, and SKOS.
- A paired representation comparison on PersonaGym and an attribute-coverage audit distinguishing schema gaps from extraction and comparison errors.

## Method

Identity covers personal characteristics, biographical events, and social relationships. Behaviour covers Big Five trait assessments, goals, needs, preferences with target/polarity/strength, task-execution tendencies, and constraints distinguishing required, recommended, optional, discouraged, forbidden, and out-of-character actions. Structured properties and controlled concepts are preferred to literal fallback fields.

OntoGPT uses the ontology and Gemma 4 31B IT to extract instances from the original persona descriptions into YAML. This YAML serializes ontology-grounded instances; it is not a replacement ontology formalism. Original prose and extracted YAML are separately supplied as persona context to the response model.

## Experiments

PersonaGym contains 200 personas and 10,000 persona-specific interaction scenarios. The paper reports running the complete benchmark under both conditions, generating responses with Gemma 4 and combining judgments from Gemma 4 and Qwen3.6 35B a3b. Scores range from 1 to 5; higher is better. Table 1 reports means and standard deviations:

| Metric | Natural language | Ontology-grounded |
| --- | --- | --- |
| Expected Action | 4.1348 ± 0.8056 | 4.2250 ± 0.8113 |
| Action Justification | 3.8937 ± 0.8391 | 3.7248 ± 1.0166 |
| Linguistic Habits | 2.5593 ± 0.6526 | 2.1898 ± 0.5193 |
| Persona Consistency | 3.5480 ± 0.8605 | 3.4183 ± 0.8495 |
| Toxicity Control | 4.1664 ± 1.0214 | 4.5664 ± 0.8347 |
| PersonaScore | 3.6604 ± 0.4163 | 3.6249 ± 0.3864 |

Of 1,536 extracted attributes, automatic comparison finds 1,510 represented (98.3%). Manual inspection of the remaining 26 identifies 13 comparison misses, 6 extraction misses, and 7 unsupported attributes. Thus schema-level representational coverage is 99.5%, distinct from automatic pipeline coverage. The 23 personas with missing attributes lose more PersonaScore on average than the 177 fully preserved personas (−0.210 versus −0.013); this descriptive association does not isolate causation.

## Limitations

Communication characteristics and cognitive models are underrepresented, consistent with the lower linguistic-habit and justification scores. The evaluation tests downstream enactment on one benchmark and one response-model family, rather than comprehensively validating ontology quality. No significance or equivalence test is reported, so similar aggregate scores do not establish statistical equivalence. Extraction, serialization, and representation change together. Attribute coverage is relative to attributes identified in these descriptions, not all possible persona information.

The supplied Markdown does not establish a publication year or stable identifier for this paper; the year is left unspecified. Its repository footnote target is absent, so no repository URL is inferred.

## Related Concepts

- [[ontology-grounded-llm-personas|Ontology-Grounded LLM Personas]]

## Related Papers

- [[llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]] provides a complementary validity perspective: preserving persona information does not establish realistic population-level behavioural diversity. This is a library connection, not a claimed citation.
- PersonaGym: Evaluating Persona Agents and LLMs (Samuel et al., 2025), cited as reference 18, supplies the evaluation framework (DOI: 10.18653/v1/2025.findings-emnlp.368).

[[index|Library home]]
