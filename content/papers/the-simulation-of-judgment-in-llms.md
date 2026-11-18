---
title: The simulation of judgment in LLMs
type: paper
authors:
  - Edoardo Loru
  - Jacopo Nudo
  - Niccolò Di Marco
  - Alessandro Santirocchi
  - Roberto Atzeni
  - Matteo Cinelli
  - Vincenzo Cestari
  - Clelia Rossi-Arnaud
  - Walter Quattrociocchi
year: 2025
tags:
  - llm-evaluation
  - news-credibility
  - human-ai-comparison
---

## TL;DR

Six LLMs often agree with expert news-source reliability ratings, but their errors vary with political orientation and their observable evaluation criteria differ from those of nonexpert humans. URL-only performance and generated keywords suggest a role for learned source associations; they do not directly identify internal reasoning mechanisms. The authors call the substitution of plausible judgment for verification “epistemia.”

## Research Question

Does agreement between LLM outputs and expert credibility ratings imply similar evaluative procedures, and how do model criteria compare with those of humans following a common protocol?

## Motivation

Automated credibility judgments shape filtering and information exposure. Accuracy against reference labels alone cannot establish whether a system verifies evidence, recalls source reputation, or responds to stylistic and political cues.

## Contributions

- Compares six models with NewsGuard and Media Bias/Fact Check (MBFC) ratings.
- Examines political asymmetries, explanatory keywords, and URL-only judgments.
- Introduces a structured retrieval and criteria-evaluation workflow for comparison with 50 nonexpert participants.

## Method

The initial pool contains 7,715 English-language news domains. Filtering for accessible content yields 2,302 domains; requiring valid JSON classifications from every model leaves 2,286, including 1,188 NewsGuard-reliable and 1,098 unreliable sources. Models are DeepSeek V3, Gemini 1.5 Flash, GPT-4o mini, Llama 3.1 405B, Llama 4 Maverick, and Mistral Large 2.

At temperature zero, models receive cleaned homepage content without examples or a supplied reliability definition. They return binary reliability, five-point political orientation, and classification, determinant, and summary keywords. Keyword political scores average the model-assigned orientations of associated domains. Political error comparisons resample 40 domains per orientation–reliability group 10,000 times.

A separate Gemini 2.0 Flash workflow selects and ranks five of six criteria: author accountability, factual accuracy, language manipulation, ownership transparency, perspective diversity, and writing professionalism. Agents retrieve the homepage and up to two articles, independently score criteria from 1 to 5, and aggregate assessments into a binary judgment. Fifty Italian-speaking adults follow a comparable laboratory protocol, each evaluating six outlets. Of 37 outlets evaluated by humans, 27 are accessible to the agent workflow.

## Experiments

| Comparison | Reported finding |
| --- | --- |
| NewsGuard unreliable sources | Model agreement ranges from 85% to 97% (Fig. 1). |
| NewsGuard reliable sources | GPT-4o mini and Llama 4 Maverick reject 32% and 35%, respectively. |
| MBFC overlap | 916 domains; GPT-4o mini and Llama 4 Maverick classify 75% and 77% of medium-credibility sources as unreliable. |
| URL-only versus homepage input | Gemini F1 is 0.78 versus 0.86; GPT F1 is 0.77 versus 0.79. |
| Agent versus human judgments | The agent labels 77% of human-rated reliable sources unreliable (Fig. 4). |

Reliable right-leaning outlets are more often classified as unreliable than reliable center- or left-leaning outlets. This is a pattern of benchmark-relative errors, not evidence of a model holding political preferences. Classification and determinant keywords separate reliability classes more sharply than topical summary keywords.

Both humans and the agent prioritize factual accuracy. The agent emphasizes ownership transparency, whereas humans more often prioritize language manipulation and writing professionalism. Nonexpert judgments show little alignment with NewsGuard in this small experiment.

## Limitations

The keyword and URL-only analyses provide behavioral proxies, not causal identification of training-data effects or proof that models cannot reason contextually. Generated explanations need not faithfully disclose the process producing a label. Expert ratings are comparison standards, not direct verification of every article. Homepage-only evidence cannot fully expose editorial practices.

Accessibility and valid-output filtering restrict the sample. The human comparison uses 50 nonexperts and only 27 shared Italian-language outlets; it also uses one agent model distinct from the six-model benchmark. Language, model, and workflow change together, limiting direct attribution of differences across experiments. The supplied Markdown references supplementary analyses but does not include the supplement.

## Related Concepts

- [[concepts/llm-as-a-judge|LLM-as-a-Judge]]: source evaluation illustrates why rubric agreement and evaluation validity must be distinguished, although the target here is news outlets rather than generated responses.
- [[concepts/source-attribution-bias-in-llm-evaluation|Source-Attribution Bias in LLM Evaluation]]: URL-only ratings motivate separating source associations from content evidence; this study does not perform the fixed-content attribution intervention that defines that concept.

## Related Papers

- Yang and Menczer (2025), “Accuracy and political bias of news source credibility ratings by large language models”: cited background on source-level model ratings and URL-based evaluation.
- Wineburg and McGrew (2019), “Lateral reading and the nature of expertise”: cited to contextualize differences between professional source verification and nonexpert heuristics.

Domain-list deposit reported by the paper: [Open Science Framework](https://osf.io/d8npc/). Its deposit identifier is 10.17605/OSF.IO/D8NPC; this is not the article DOI.
