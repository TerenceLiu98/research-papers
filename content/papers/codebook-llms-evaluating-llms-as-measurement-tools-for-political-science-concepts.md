---
title: "Codebook LLMs: Evaluating LLMs as Measurement Tools for Political Science Concepts"
type: paper
authors:
  - Andrew Halterman
  - Katherine A. Keith
year: null
tags:
  - large-language-models
  - political-methodology
  - text-as-data
  - measurement-validity
  - codebook-classification
---

## TL;DR

Using a large language model to apply a social-science codebook is a measurement problem, not merely a prompting task. Across three political-text datasets, 7-12B open-weight models show weak or marginal zero-shot classification and sensitivity to label wording, category order, and codebook details. A five-stage workflow combines codebook preparation, behavioral testing, labeled evaluation, error analysis, and supervised instruction tuning. QLoRA instruction tuning improves weighted F1 on all reported model-dataset combinations, but cross-codebook transfer remains poor.

## Research Question

Can off-the-shelf LLMs faithfully apply the project-specific operational definitions in political-science codebooks, and how should researchers test and improve their validity as measurement tools?

## Motivation

Political concepts such as protest can have different operational definitions across projects. An LLM may recognize the broad background concept while ignoring inclusion rules, exclusions, or distinctions encoded in a particular codebook. Predictions can therefore appear plausible yet measure a different construct, threatening validity and downstream inference. The paper treats faithful codebook use as an empirical claim that must be tested for each codebook-model pairing.

## Contributions

- Proposes a five-stage framework for [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]], from codebook preparation through supervised fine-tuning.
- Defines seven codebook-specific behavioral tests, including four that need no ground-truth labels and three that probe definition-following with labeled examples.
- Curates and reformats three real-world political-science codebooks and associated text-label datasets covering political violence, U.S. protest events, and party manifestos.
- Benchmarks four open-weight models in early tests and reports zero-shot and QLoRA instruction-tuning results for Mistral-7B and Llama-8B.
- Uses ablations and manual error analysis to distinguish valid-label compliance from faithful application of codebook semantics.

## Method

The framework has five stages:

1. **Codebook preparation:** express each category in a semi-structured format with an exact label, definition, clarifications, exclusions, and optional positive and negative examples.
2. **Label-free behavioral testing:** test legal-label output, verbatim definition recovery, classification of examples included in the codebook, and invariance to category order.
3. **Zero-shot evaluation with labels:** hand-code an evaluation set and measure predictive performance for the intended codebook-model pairing.
4. **Zero-shot error analysis:** run exclusion-criterion, generic-label, and swapped-label tests; ablate codebook components; and manually inspect model outputs.
5. **Supervised fine-tuning:** when zero-shot behavior is inadequate, instruction-tune on codebook-document-label triples. The experiments use 4-bit quantization and rank-16 LoRA, with loss computed only on output tokens.

For multiclass prediction, the full codebook and one document are placed in the prompt, and the first generated sequence matching a legal label becomes the prediction. Weighted F1 on development data is the principal aggregate metric. Bootstrap intervals use 500 resamples of prediction-label pairs.

## Experiments

### Data and Models

The BFRS dataset has 12 political-violence classes and 20,978/4,495/4,496 train/development/test instances. The Crowd Counting Consortium (CCC) dataset has 8 event classes and 4,710/1,009/1,010 instances. The Manifestos dataset has 142 policy classes and 8,081/1,732/1,732 instances. Experiments use training and development splits, reserving the test splits.

The initial comparison includes Mistral-7B-Instruct-v0.2, Mistral-NeMo-Instruct-2407, Llama-3.1-8B-Instruct, and OLMo-7B-0724-Instruct-hf. OLMo is dropped after weak label-free tests; later stages focus on Mistral-7B and Llama-8B.

### Behavioral and Zero-Shot Results

Mistral-7B, Mistral-NeMo-12B, and Llama-8B perform well on legal-label output and verbatim recovery tests, but all tested models are sensitive to category order. In labeled behavioral tests, Mistral-7B and Llama-8B perform poorly when an artificial exclusion criterion must be applied consistently and degrade when meaningful labels are replaced or paired with different definitions. These results indicate reliance on label semantics rather than definitions alone.

With the authors' semi-structured codebooks, weighted zero-shot F1 is 0.57/0.53 for Llama-8B/Mistral-7B on BFRS, 0.61/0.65 on CCC, and 0.19/0.15 on Manifestos. Original-codebook results are 0.55/0.44, 0.48/0.51, and 0.21/0.14, respectively. Reformatting therefore helps some codebook-model pairs but is not a general solution.

Manual analysis of Mistral-7B finds non-compliance in 0% of sampled BFRS outputs, 2% of CCC outputs, and 45% of Manifestos outputs. Semantics or reasoning mistakes account for 50%, 26%, and 29% of those samples. The authors also identify lexical-overlap shortcuts, ambiguous codebook precedence, document problems, and disputed gold labels.

### Instruction-Tuning Results

QLoRA improves every reported model-dataset combination. BFRS weighted F1 reaches 0.81 for Llama-8B and 0.82 for Mistral-7B, gains of 0.24 and 0.29 over zero-shot. CCC reaches 0.68 and 0.72, both gains of 0.07. Mistral-7B reaches 0.38 on Manifestos, a gain of 0.23; the Llama-8B Manifestos run is omitted after an out-of-memory failure at batch size one. The largest relative gain is 55% for Mistral-7B on BFRS.

Instruction tuning does not produce strong transfer to unseen codebooks, even when training uses multiple codebooks. The reported gains therefore support codebook-specific adaptation rather than a demonstrated general codebook-following capability.

## Limitations

- The study covers three English-language political-text tasks and only single-label multiclass classification; transfer to other languages, domains, information extraction, and multilabel tasks is untested.
- The principal models have 7-12B parameters and were selected for local reproducibility and 24GB-class deployment. Results do not characterize larger proprietary models or later model generations.
- Ground-truth data are imperfect. In manual samples, the authors dispute 4% of BFRS, 10% of CCC, and 8% of Manifestos labels; scraped text and underspecified category precedence introduce additional error.
- Aggregate weighted F1 can obscure rare-class failures. Some classes have very small support, especially in the 142-class Manifestos setting.
- Instruction tuning requires labeled data and nontrivial compute, and the paper's cross-codebook experiments show poor generalization beyond the training codebook.
- The manuscript estimates environmental costs and notes uncertainty about pretraining-data provenance. It also limits its contamination claims: the Manifesto texts and codebook may occur in pretraining data even though sentence-level labels require registered API access.
- The supplied manuscript does not state a publication year, DOI, or arXiv identifier, so these metadata are not inferred here.

## Related Concepts

- [[concepts/codebook-llm-measurement|Codebook-LLM Measurement]]
- [[concepts/instruction-tuning-data-diversity|Instruction-Tuning Data Diversity]]
- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/socio-political-event-extraction|Socio-Political Event Extraction]]

## Related Papers

- [[papers/measuring-scalar-constructs-in-social-science-with-llms|Measuring Scalar Constructs in Social Science with LLMs]]: evaluates LLM measurement of continuous rather than categorical social-science constructs and separates ranking from numerical agreement.
- [[papers/benchmarking-llms-for-political-science-a-united-nations-perspective|Benchmarking LLMs for Political Science: A United Nations Perspective]]: evaluates political classification and generation across linked UN Security Council tasks.
- Egami et al. (2023), "Using Imperfect Surrogates for Downstream Inference": studies bias and uncertainty when model-generated labels enter later social-science analyses.
- Ribeiro et al. (2020), "Beyond Accuracy: Behavioral Testing of NLP Models with CheckList": supplies the behavioral-testing perspective adapted to codebook use.
- Dettmers et al. (2024), "QLoRA: Efficient Finetuning of Quantized LLMs": supplies the parameter-efficient fine-tuning method used in Stage 4.

[[index|Library home]]
