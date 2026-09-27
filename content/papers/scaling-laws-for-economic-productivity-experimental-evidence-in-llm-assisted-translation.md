---
title: "Scaling Laws for Economic Productivity: Experimental Evidence in LLM-Assisted Translation"
type: paper
authors:
  - Ali Merali
year: 2024
date: "2024-12-10"
tags:
  - economic-productivity
  - llm-assisted-translation
  - scaling-laws
  - randomized-experiments
---

## TL;DR

In a preregistered experiment with 300 professional translators, access to models with ten times more training compute was associated with 12.3% less task time, a 0.25-point improvement on a seven-point quality scale, and 16.1% higher experimental earnings per minute. Time savings were larger for translators who were slower on an unaided baseline task. These [[concepts/economic-productivity-scaling-laws|Economic Productivity Scaling Laws]] describe short translation tasks over just over two orders of magnitude of compute. The paper's roughly 6.9% U.S. productivity projection is a separate, assumption-dependent extrapolation.

## Research Question

How does LLM training compute relate to the speed, quality, and earnings of workers assisted by those models, and do the gains differ by baseline worker performance?

## Motivation

Prior productivity experiments largely compare access to a particular AI system against no AI assistance. Model scaling research instead relates training resources to machine prediction performance. This paper connects these questions by measuring human economic outcomes across models of different compute sizes, asking whether better models yield greater workplace benefits and how those benefits are distributed.

## Contributions

- Compares assistance from 13 LLMs with a no-AI control in a professional translation experiment.
- Estimates relationships between log training compute and task time, expert-assessed quality, and earnings per minute.
- Examines heterogeneity using a median split in unaided baseline completion time.
- Uses the translation estimates in a task-based macroeconomic calculation that incorporates future model scaling and assumed profitability of LLM assistance.

## Method

The study recruited 300 translators through Freelancer and Fiverr, evenly divided among English-to-Spanish, English-to-Hindi, and English-to-Arabic translation. Eligibility required at least one year of professional experience, paid translation work in the previous year, language proficiency, and consent to monitoring of AI usage. Participants completed one unaided baseline task and five subsequent tasks, giving 1,800 tasks including the baseline. Later results were excluded if baseline quality was insufficient.

Participants were randomly assigned access to one of 13 LLMs or a no-AI control. Practice tasks preceded the experimental tasks to familiarize participants with the assigned model and monitor compliance. Texts covered business, academic, and literary material. Three experienced translators graded each submission; the outcome was their average score on a seven-point scale. Graders could receive bonuses for agreement with other graders.

Participants received \$10 for satisfactory completion of the survey and could earn \$2 per task with an average grade of at least six, up to \$12 in bonuses. Section 3.4 defines satisfactory task quality as a grade of at least two and identifies earnings per minute, including bonuses, as the preferred preregistered productivity measure. This is an incentive-defined experimental outcome, not an observed market wage.

Regressions compare pooled AI access against control and relate outcomes to log model training compute, with and without language and task controls. Appendix A also reports log-time specifications. The headline time percentages summarize reductions relative to average task time; they should not be interpreted as a universal constant elasticity. The skill analysis classifies below-median baseline time as higher skill and above-median time as lower skill.

## Experiments

### AI Access and Model Scaling

| Comparison | Outcome | Reported result | Source |
| --- | --- | --- | --- |
| Any AI model versus control | Task time | 600.7 to 413.8 seconds, a 31.1% reduction; p reported as 0.000 | Section 3.1; Appendix A, Table 2 |
| Any AI model versus control | Quality | 4.51 to 4.71 points, about 0.14 SD; p = 0.148, not statistically significant in the pooled unadjusted comparison | Section 3.1; Appendix A, Table 2 |
| Tenfold increase in training compute | Task time | 12.3% reduction; p = 0.001 | Section 3.2; Appendix A, Table 3 |
| Tenfold increase in training compute | Quality | About +0.25 points, or +0.18 SD; p reported as 0.000 | Section 3.3; Appendix A, Table 4 |
| Tenfold increase in training compute | Earnings per minute | About +\$0.19 against a mean of \$1.18, or +16.1%; narrative reports p = 0.001 | Section 3.4; Appendix A, Table 5 |
| Tenfold increase in training compute, by baseline speed | Task time | 21.1% reduction for the slower group versus 4.9% for the faster group; reported heterogeneity p = 0.017 | Section 3.5; main-text Table 1 |

Values printed as p = 0.000 reflect the paper's reporting precision, not an exactly zero probability. The earnings significance claim also needs caution: Table 5 reports coefficients and standard errors of 0.1921 (0.0755) and 0.1856 (0.0718), which do not support the narrative's p = 0.001 under conventional two-sided inference. The controlled pooled quality estimate is 0.2438 (0.1023), distinct from the unadjusted comparison highlighted in Section 3.1.

Appendix A reports 1,500 time observations and 1,499 quality observations for the pooled AI-versus-control regressions. The compute regressions use 1,392 observations for time and earnings, and 1,391 for quality. These counts distinguish the follow-up analysis from the 1,800 tasks including baseline.

The author also reports a hypothetical 70-fold compute increase, termed a "GPT-jump," as corresponding to 22.7% less time and 29.7% higher earnings per minute. This rescales the estimated relationship; it is not a separate experimental comparison of successive GPT releases.

### Aggregate Productivity Scenario

Section 4 adapts Acemoglu's task-based framework using an AI-exposed task share of 19.9%, a labor cost share of 57%, and projected average task-level savings of 61.2%. The last parameter assumes that relative gains from scaling beyond earlier AI models transfer from translation to other tasks, and that models trained with roughly $10^{30}$ FLOPs become available by 2030 and are subsequently adopted. The calculation further assumes that all productivity-enhancing LLM uses are profitable, motivated by low inference costs.

Multiplying these inputs yields approximately 6.9% aggregate productivity growth over the following decade; the paper reports 6.95%. This is a scenario conditional on cross-task transfer, future scaling, profitability, and adoption. The experiment does not establish this forecast or a guaranteed lower bound. The calculation holds the economy's task structure fixed and excludes changes to the rate of technological progress.

## Limitations

- Evidence covers one occupation, three translation directions, short tasks, and just over two orders of magnitude of training compute. Transfer to longer workflows, other professions, and much larger models is untested.
- Random assignment to model access supports comparisons among the assigned systems, but does not isolate training compute from other differences across models. The supplied text does not enumerate all 13 models or document their compute estimates.
- Baseline completion time is a narrow skill proxy. Larger gains among slower translators do not establish effects on long-run wages, employment, or inequality.
- Earnings per minute depends on the study's fixed payment and quality bonus. Cheap inference alone does not establish that organizational integration and oversight are costless.
- The supplied text does not specify the standard-error clustering procedure despite repeated observations per translator, and it provides no preregistration identifier. These details cannot be verified from this source.
- The supplied Markdown has inconsistent figure/table cross-references, an unfinished sentence in Section 3.3, and an empty Task Six entry in Appendix B. The table labels above follow the displayed captions. The earnings p-value discrepancy remains unresolved.

## Related Concepts

- [[concepts/economic-productivity-scaling-laws|Economic Productivity Scaling Laws]]: empirical links between model training resources and assisted worker outcomes.
- [[concepts/cost-aware-model-selection|Cost-Aware Model Selection]]: evaluates deployment benefits together with costs; training compute and inference cost enter different parts of this paper's argument.

## Related Papers

The following works are cited in the supplied paper:

- Kaplan et al. (2020), "Scaling Laws for Neural Language Models": the model-loss scaling literature motivating the economic extension.
- Noy and Zhang (2023), "Experimental Evidence on the Productivity Effects of Generative Artificial Intelligence": a professional-task productivity study used in the aggregate calculation.
- Brynjolfsson, Li, and Raymond (2023), "Generative AI at Work": the other productivity study used in that calculation.
- Acemoglu (2024), "The Simple Macroeconomics of AI": the task-based aggregation framework adapted in Section 4.
- Hackenburg et al. (2024), "Evidence of a Log Scaling Law for Political Persuasion with Large Language Models": a related scaling application to persuasion rather than assisted worker productivity.

[[index|Library home]]
