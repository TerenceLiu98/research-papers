---
title: "PolitiCause: An Annotation Scheme and Corpus for Causality in Political Texts"
type: paper
authors:
  - Paulina Garcia-Corral
  - Hannah Béchara
  - Ran Zhang
  - Slava Jankin
year: null
tags:
  - causal-language
  - political-text
  - corpus-annotation
  - relation-extraction
---

## TL;DR

PolitiCAUSE provides 17,780 political sentences with causal/non-causal labels and cause-effect span annotations. Its annotation scheme captures complete, explicit causal claims within a sentence, including hypothetical and counterfactual claims, without judging their truth. Fine-tuned BERT and RoBERTa both achieve a reported Matthews correlation coefficient (MCC) of 0.617; BERT's reported F1 is 0.732. The benchmark evaluates sentence classification, leaving automated span extraction untested, and some reported metrics require clarification.

## Research Question

How can causal claims in political discourse be annotated consistently, and how well can transformer classifiers distinguish sentences containing those claims from sentences without them?

## Motivation

Political speakers use anticipated policy effects, retrospective blame, and counterfactual arguments to persuade audiences. Annotation schemes developed for scientific or medical text may not capture these constructions adequately. [[concepts/causal-text-mining|Causal Text Mining]] can identify the causal accounts a speaker advances, providing material for political argument analysis. Detecting a claim does not establish its factual accuracy or the effect of the policy it describes.

## Contributions

- An interpretation-based annotation scheme for sentence labels, cause-effect spans, links between spans, optional responsible or affected entities, and annotator confidence.
- A corpus drawn from United Nations General Debate statements and UK government press conferences, combining scripted diplomatic speech with more conversational political language.
- A benchmark of BERT, RoBERTa, and DistilBERT fine-tuned on the corpus, with a pretrained causal-classification comparator from UniCausal.
- An analysis connecting shared model errors with lower human confidence and greater annotation disagreement.

## Method

### Annotation Scheme

Annotators identify a relation in which one event causes a change in another, label the sentence, mark cause and effect spans, and link them. Both events must be present in the same sentence, and the relation must be interpretable without outside information. Rephrasing the statement into a "because-first" structure without adding information serves as a completeness check. Connectives are cues, but their presence is neither required nor sufficient.

Potential effects, prevention, and counterfactual policy claims qualify as causal language. Factual truth is outside the annotation task. An optional "subject" span identifies the entity responsible for or affected by an event, rather than necessarily its grammatical subject. This is intended to reduce disagreement over event-span boundaries. Annotators also record confidence; Section 3 specifies a 1-5 scale, while Section 4 describes it as 0-5.

Appendix 9.1 illustrates the boundary: a statement that international solidarity can prevent a climate disaster is causal, as is one attributing tensions to disagreement over the Iran nuclear deal. A fragment listing aims such as combating terrorism is non-causal because it omits the cause event. Thus, prevention can qualify even when the effect does not occur, while a stated purpose alone need not form a complete causal relation.

Appendix 9.2 distinguishes agreement on a relation from agreement on its spans. Annotators agree that COVID-19 causes a recession but differ on how much of the recession description belongs in the effect span. A second example illustrates the intended benefit of tagging France separately as a participant. These examples motivate the annotation design; they do not quantify an improvement in span agreement.

### Corpus Construction

The source collections comprise 8,872 UN General Debate documents, including official English translations, and 429 UK press conference transcripts (Table 1). Twelve political science graduate students annotate over five months after three training and feedback iterations. Section 4.1 describes 60,000 annotated sentences before filtering; Section 4.3 distinguishes the retained 17,780 unique sentences from 55,754 individual annotations.

Retained sentences have at least two annotations, sufficient label agreement, and mean confidence of at least 3. Majority voting supplies sentence labels; sentences with a causal-label proportion between 0.4 and 0.6 are discarded. The resulting corpus contains 12,710 non-causal and 5,070 causal sentences, approximately 71% and 29% respectively. Mean confidence is 4.49 overall, 4.63 for non-causal sentences, and 4.13 for causal sentences.

## Experiments

### Setup

Table 2 gives a 70/15/15 split with similar class proportions:

| Split | Sentences | Non-causal | Causal |
| --- | ---: | ---: | ---: |
| Training | 12,446 | 8,897 | 3,549 |
| Validation | 2,667 | 1,906 | 761 |
| Test | 2,667 | 1,907 | 760 |

The three encoders are fine-tuned for ten epochs, retaining the best epoch for inference. Appendix 9.3 lists maximum sequence length 512, batch size 16, and weight decay 0.01. The experiments reportedly take less than two GPU hours on one NVIDIA A100 40GB. The supplied learning-rate entry is ambiguous and is not treated as a usable replication setting below.

### Reported Classification Results

The following values reproduce Table 3; they are reported results, not independently recomputed metrics.

| Model | Accuracy | Precision | Recall | MCC | F1 |
| --- | ---: | ---: | ---: | ---: | ---: |
| BERT | 0.832 | 0.671 | 0.805 | 0.617 | 0.732 |
| RoBERTa | 0.836 | 0.686 | 0.783 | 0.617 | 0.731 |
| DistilBERT | 0.832 | 0.696 | 0.730 | 0.594 | 0.712 |
| UniCausal comparator | 0.715 | 0.500 | 0.612 | 0.550 | 0.349 |

BERT has the highest reported F1 by a small margin, RoBERTa the highest accuracy, and DistilBERT the highest precision among the three fine-tuned models. The authors interpret the lower comparator results as support for domain-specific annotation. This comparison does not isolate genre from training-data and annotation-scheme differences. In particular, the UniCausal precision and recall would yield an ordinary binary F1 of approximately 0.550, not the reported 0.349; its exact score gap should therefore be treated cautiously.

### Error Analysis

All three fine-tuned models misclassify the same 248 sentences, comprising 157 gold causal and 91 gold non-causal examples (Section 4.5). Their mean annotation confidence is 4.26, below the full corpus's 4.49. The authors also report greater annotator disagreement in this subset. Causal connectives occur in 50% of causal sentences and 37% of non-causal sentences in the full corpus, illustrating why lexical triggers alone cannot implement the annotation definition.

## Limitations

- Implicit, incomplete, and cross-sentence causal relations are excluded. Results concern English-language political text from two source collections and do not establish transfer to other languages or institutions.
- Filtering on agreement and confidence removes ambiguous cases. Majority labels and confidence measure adherence to the annotation convention; they do not verify causal claims. The supplied text reports no aggregate span-agreement coefficient or span-extraction benchmark.
- Majority voting resolves sentence labels, but the supplied text does not specify how differing annotator spans are consolidated into a single reference annotation. The span-disagreement examples in Appendix 9.2 make this relevant for reusing the corpus in extraction tasks.
- The stated split preserves class proportions, but the paper does not establish document-, speaker-, or time-disjoint evaluation. Repeated-run variability and confidence intervals are not reported.
- The supplied text has unresolved reporting inconsistencies. Table 4 reverses the full-corpus majority-label ratios relative to the prose. Section 4.5 calls the shared errors an overestimation of causality, although its stated gold-label counts imply more false negatives than false positives within that subset. These counts do not establish error direction across the whole test set.
- Table 3's comparator F1 is inconsistent with its precision and recall under the usual binary definition. Table 5 prints the learning rate as `2e5`; the intended value cannot be recovered confidently from this Markdown. Neither entry is silently corrected here.
- Political texts can contain discriminatory claims and disproportionately represent dominant perspectives. Detection of those claims does not imply endorsement, and downstream fact-checking or policy-effect estimation is not evaluated.

Publication year, venue, and a stable identifier are not supplied in the parsed Markdown; the year is left unknown.

## Related Concepts

- [[concepts/causal-text-mining|Causal Text Mining]]: separates causal-language detection from cause-effect span extraction and factual causal inference.
- [[concepts/causal-micro-narrative-classification|Causal Micro-Narrative Classification]]: a related target-centered task that assigns semantic cause/effect categories rather than only sentence labels and spans.

## Related Papers

- Tan, Zuo, and Ng (2023), "UniCausal: Unified Benchmark and Repository for Causal Text Mining": cited consolidated benchmark and source of the specialized comparator.
- Dunietz, Levin, and Carbonell (2017), "The BECauSE Corpus 2.0: Annotating Causality and Overlapping Relations": cited construction-based causal annotation resource.
- Tan et al. (2022), "The Causal News Corpus: Annotating Causal Relations in Event Sentences from News": cited news-domain sentence annotation dataset.
- [[papers/causal-micro-narratives|Causal Micro-Narratives]]: a library comparison, not a citation in this paper, that classifies inflation explanations using an expert ontology and examines ambiguity in implicit causal language.

[[index|Library home]]
