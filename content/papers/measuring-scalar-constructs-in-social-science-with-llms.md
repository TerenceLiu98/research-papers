---
title: Measuring Scalar Constructs in Social Science with LLMs
type: paper
authors:
  - Hauke Licht
  - Rupak Sarkar
  - Patrick Y. Wu
  - Pranav Goel
  - Niklas Stoehr
  - Elliott Ash
  - Alexander Miserlis Hoyle
year: null
tags:
  - text-as-data
  - political-methodology
  - large-language-models
  - scalar-measurement
  - pairwise-comparisons
---

## TL;DR

Across three political-text datasets, LLM scores can cluster around a few numeric responses even when their rankings correlate strongly with human judgments. Averaging over score-token probabilities makes pointwise prompting competitive with or better than pairwise prompting for ranking, although numerical error can still favor pairwise scoring. Fine-tuning smaller models on pairwise labels is data-efficient, with gains depending on the task and metric; it does not uniformly beat the best prompted model. Human-derived reference scores also contain measurement error.

## Research Question

How should LLMs measure continuous social-science constructs from text: direct numeric responses, probability-weighted pointwise scores, aggregated pairwise comparisons, or fine-tuning on labeled comparisons?

## Motivation

Constructs such as fear, negativity, and grandstanding vary in degree. [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]] makes measurement inexpensive to specify, but its numeric output can reflect response-token preferences and prompt sensitivity. A model may order texts reasonably while distorting their distances. Pairwise judgments reduce the need to choose an absolute score, but their advantages for human annotation need not carry over to LLM prompting.

## Contributions

- Documents score heaping, inter-model disagreement, and the limits of smoothing highly concentrated token distributions.
- Benchmarks prompting and fine-tuning against three datasets of human pairwise judgments, evaluating both ranking and numerical error.
- Compares pairwise reward-model training with regression on inferred scores, finding greater data efficiency for the pairwise objective.
- Examines discrepant human and model rankings through additional blind annotation, qualifying the treatment of human labels as ground truth.

## Method

**Pointwise prompting.** Prompts adapt the original annotation codebooks and request an integer from 1 to 9. [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]] replaces the most probable response with

$$
\hat{s}_i=\frac{\sum_{s\in\mathcal{S}}P(y=s\mid c_i)n(s)}{\sum_{s\in\mathcal{S}}P(y=s\mid c_i)},
$$

where $\mathcal{S}$ contains the allowed score tokens and $n(s)$ is their numeric value. The denominator conditions on valid score tokens. Concentrated probabilities can leave substantial heaping after averaging (Section 2.1).

**Pairwise prompting.** The model selects the text higher on the construct. The authors vary text order and response labels across four presentations, align the response probabilities to the same item, and average them before determining the comparison outcome. [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]] then estimates item scores from those comparisons, with $P(i\succ j)=\sigma(z_i-z_j)$ (Section 2.2 and Appendix A).

**Fine-tuning.** A model with a scalar head learns from a preferred text $x_h$ and a lower-ranked text $x_l$ using

$$
\mathcal{L}(\theta)=-\log\sigma\bigl(r_\theta(x_h)-r_\theta(x_l)\bigr).
$$

At inference, $r_\theta(x)$ scores each text individually without new pairwise comparisons. The regression baseline instead trains on Bradley-Terry scores inferred from training comparisons (Sections 2.3 and 3.2).

**Models and evaluation.** Prompting compares instruction-tuned Qwen 2.5 at 7B, 32B, and 72B and Llama 3.1 8B and 3.3 70B, with zero or five randomly sampled demonstrations. Main prompting runs use 4-bit quantization. Fine-tuning compares DeBERTa-v3-large, ModernBERT-large, and Llama-3.1-8B-Instruct. Each dataset holds out 100 high-degree text vertices; training uses only edges among training vertices. Reference Bradley-Terry scores are fitted to the full human comparison graph. Spearman correlation and RMSE evaluate held-out items; pair accuracy uses edges with at least one held-out item. Prompting Table 2 summarizes 25 bootstrap estimates, while fine-tuning Table 3 summarizes five folds.

## Experiments

### Datasets

| Construct | Text items | Annotated pairs | Source and setting |
| --- | ---: | ---: | --- |
| Immigration fear | 334 | 6,489 | Carlson and Montgomery (2017); open-ended U.S. survey responses expressing fear, anxiety, or worry about immigration |
| Ad negativity | 935 | 9,489 | Carlson and Montgomery (2017); transcripts of advertisements from the 2008 U.S. Senate elections |
| Grandstanding | 3,499 | 38,348 | Park (2021); U.S. House committee statements ranging from opinionized to factual or information-seeking speech |

### Prompting Results

Selected Qwen-2.5-72B rows from Table 2 illustrate the distinction between ranking and numerical error. Values are reported means; all pointwise rows use token-probability weighting.

| Dataset | Five-shot method | Pair accuracy | Spearman rho | RMSE |
| --- | --- | ---: | ---: | ---: |
| Immigration fear | Pairwise | 0.77 | 0.84 | 0.16 |
| Immigration fear | Pointwise | 0.77 | 0.87 | 0.20 |
| Ad negativity | Pairwise | 0.81 | 0.87 | 0.19 |
| Ad negativity | Pointwise | 0.81 | 0.92 | 0.17 |
| Grandstanding | Pairwise | 0.67 | 0.56 | 0.19 |
| Grandstanding | Pointwise | 0.67 | 0.66 | 0.29 |

Thus, stronger pointwise rank correlation does not imply lower RMSE. On ad negativity, five-shot Llama-3.3-70B has rho 0.90 but RMSE 0.25, versus Qwen's 0.92 and 0.17. The paper links this difference to Llama's concentrated response probabilities, which leave heaping largely intact after weighting. Few-shot examples generally improve accuracy and correlation, but do not uniformly improve RMSE (Section 4.1).

### Fine-Tuning and Additional Checks

With 1,000 labeled pairs, DeBERTa-v3-large reaches rho 0.83, 0.88, and 0.70 on immigration fear, ad negativity, and grandstanding, respectively. At 2,000 pairs these rise to 0.89, 0.89, and 0.73, with RMSE 0.19, 0.19, and 0.22. The best prompted correlations are 0.87, 0.92, and 0.66, so fine-tuning's advantage is task-dependent. Even 500 grandstanding pairs yield rho 0.67, but the associated accuracy and RMSE do not beat the best prompting results. Regression on inferred Bradley-Terry labels is reported as less data-efficient and less stable in RMSE (Table 3 and Figure 11).

The main text compares direct expert scores with human-comparison-derived scores, finding agreement of a similar order to LLM-human agreement. Appendix C then selects 60 immigration-fear pairs with strongly discrepant model and reference rankings for four blind annotators, including two authors. Majority-vote results in Table 11 favor LLM scores in 41 cases, the original Bradley-Terry scores in one, and neither in 18. This selected disagreement sample diagnoses possible reference-label error; it is not a representative estimate of overall superiority.

Appendix D includes a limited GPT-4o comparison on ad negativity: five-shot rho is 0.917 and RMSE 0.209, compared with Qwen-2.5-72B's 0.918 and 0.165 (Table 12). Selected quantized versus unquantized prompting checks yield similar results (Table 13). Strategic exemplar selection and preliminary pair-selection changes do not consistently improve performance. Fine-tuning subsamples match average degree and clustering coefficient across datasets up to roughly 2,000 edges, after which structural differences prevent continued matching.

## Limitations

- The datasets cover three constructs in English-language U.S. political communication. Transfer to other constructs, languages, countries, and text genres remains untested.
- Human comparisons and the Bradley-Terry model define an imperfect reference. Ranking agreement, numerical agreement, and substantive construct validity are distinct; high-degree test-item selection also limits representativeness.
- Pairwise prompting reuses the observed human comparison schedule. Effective pair sampling for a new corpus remains unresolved. Probability-weighted scoring requires access to score-token probabilities.
- Reported gains depend on the metric and training budget. Strong correlation does not establish calibrated distances, and pairwise fine-tuning does not uniformly dominate prompting.
- The supplied source has reporting inconsistencies: its limitations state that closed APIs were not evaluated, although Table 12 includes GPT-4o; Section 3.2 describes 4-bit Llama fine-tuning while Table 8 lists 8-bit. Appendix C's Dawid-Skene totals differ between prose and Table 11, whose entries sum to 51 rather than the stated 60 pairs. The majority-vote summary above follows Table 11 without resolving the discrepancy.
- Some appendix prompts are fragmented in the supplied Markdown. No explicit publication year, DOI, or arXiv identifier for this paper is supplied; these metadata are left unspecified.

## Related Concepts

- [[concepts/direct-query-text-scaling|Direct-Query Text Scaling]]
- [[concepts/probability-weighted-llm-scoring|Probability-Weighted LLM Scoring]]
- [[concepts/bradley-terry-scaling|Bradley-Terry Scaling]]
- [[concepts/text-scaling-models|Text Scaling Models]]

## Related Papers

- [[papers/positioning-political-texts-with-large-language-models-by-asking-and-averaging|Positioning Political Texts with Large Language Models by Asking and Averaging]]: cited as Le Mens and Gallego (2025) for direct scoring and averaging; the library page summarizes a September 2024 manuscript version.
- Carlson and Montgomery (2017), "A Pairwise Comparison Framework for Fast, Flexible, and Reliable Human Coding of Political Texts": supplies the immigration-fear and ad-negativity comparisons.
- Park (2021), "When Do Politicians Grandstand? Measuring Message Politics in Committee Hearings": supplies the grandstanding comparisons.
- Wang, Zhang, and Choi (2025), "Improving LLM-as-a-Judge Inference with the Judgment Distribution": cited methodological basis for using response probabilities and debiasing comparisons.
- [[papers/validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a related library study of human validation and uncertainty in text scaling; not cited in the supplied paper.

[[index|Library home]]
