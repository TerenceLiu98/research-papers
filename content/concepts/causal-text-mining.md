---
title: Causal Text Mining
type: concept
aliases:
  - Causal Language Detection
  - Causal Relation Extraction
tags:
  - causal-language
  - relation-extraction
  - corpus-annotation
  - text-as-data
---

## Overview

Causal text mining identifies causal relationships expressed in language and extracts their textual components. It commonly separates detection of a causal statement from identification of its cause and effect spans. The output represents an assertion in a text, including potentially false, hypothetical, or counterfactual assertions. Establishing whether the asserted relationship holds in the world requires separate evidence.

## Key Ideas

- **Separate detection from extraction.** A binary sentence classifier does not locate cause-effect spans or determine which spans belong together. Classification performance alone cannot establish extraction quality.
- **Specify the scope of explicitness.** Annotation schemes must decide whether to include implicit causes, incomplete statements, and relations spanning sentences. PolitiCAUSE requires both events and an explicit relation within one sentence. Its "because-first" paraphrase check tests whether the relation can be restated without adding information.
- **Interpret meaning beyond connectives.** Words such as "because" may signal causation, but triggers can appear in incomplete or non-causal constructions. Causal verbs and other formulations may convey a relation without a listed connective.
- **Include prevention when the scheme permits it.** A claim that one event prevents another still expresses a causal relation. PolitiCAUSE includes potential prevention, so a positive causal label does not mean that the effect occurred or that the cause increased its likelihood.
- **Separate causal presence, orientation, and sign.** In fuzzy cognitive map extraction, an edge's source-target order identifies which factor affects which, while its sign identifies an increasing or decreasing effect. A positive sentence-level causal label, a correctly oriented edge, and a positive edge sign are distinct judgments.
- **Distinguish events from participants.** Separately marking responsible or affected entities can clarify event-span boundaries. PolitiCAUSE uses optional "subject" spans for this purpose; the tag is not simply a grammatical-subject label.
- **Make uncertainty visible.** Sentence labels, span boundaries, and the linking of events create different opportunities for disagreement. PolitiCAUSE's appendix shows agreement on a cause paired with disagreement about the length of its effect span. Majority voting over sentence labels does not resolve these boundary differences; extraction benchmarks also need a rule for constructing reference spans. Confidence filtering and majority voting define a usable benchmark while potentially excluding difficult language that downstream systems will encounter.
- **Evaluate the annotation contract.** A domain-trained classifier and a transferred classifier may differ because of topic, rhetorical style, label definitions, or training data. Domain comparisons require attention to these differences, as well as class imbalance and agreement among reported metrics.
- **Evaluate semantic and structural errors separately.** Berijanian et al. compare endpoint phrases approximately and allow partial positives for matching endpoints with an incorrect sign. Their improved but incomplete agreement with human rankings motivates examining wording, orientation, and sign errors separately; the score's normalization determines how much those errors affect the result.

## Important Papers

- [[papers/politicause-an-annotation-scheme-and-corpus-for-causality-in-political-texts|PolitiCause: An Annotation Scheme and Corpus for Causality in Political Texts]]: introduces political sentence labels and cause-effect spans with confidence and agreement filtering; benchmarks sentence classification rather than span extraction.
- [[papers/causal-micro-narratives|Causal Micro-Narratives]]: develops a related task that detects and categorizes causal explanations about a selected target using a domain ontology, with inflation as the case study.
- [[papers/soft-measures-for-extracting-causal-collective-intelligence|Soft Measures for Extracting Causal Collective Intelligence]]: extracts signed source-target triples from social-ecological passages and compares soft edge scores with human preference rankings.

## Related Concepts

- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]: labels causes and consequences relative to a target, adding semantic categories beyond causal presence or span boundaries.
- [[concepts/ontology-constrained-relation-extraction|Ontology-Constrained Relation Extraction]]: structures textual relationships using a predefined inventory; causal text mining additionally requires conventions for causal direction, completeness, and explicitness.
- [[concepts/fuzzy-cognitive-maps|Fuzzy Cognitive Maps]]: organizes extracted signed relationships into a representation of a causal mental model.
- [[concepts/soft-edge-based-graph-evaluation|Soft Edge-Based Graph Evaluation]]: evaluates approximate endpoint matches and relation attributes against reference graphs.
