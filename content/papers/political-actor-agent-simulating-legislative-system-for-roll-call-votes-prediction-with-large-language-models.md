---
title: "Political Actor Agent: Simulating Legislative System for Roll Call Votes Prediction with Large Language Models"
type: paper
authors:
  - Hao Li
  - Ruoyuan Gong
  - Hao Jiang
year: null
source_job_id: "74c7227d-34f2-4eef-8d4f-567d50b67cfc"
tags:
  - legislative-behavior
  - roll-call-voting
  - llm-agents
  - computational-social-science
---

## TL;DR

Political Actor Agent (PAA) predicts legislators' votes using LLM role profiles, reasoning from three political perspectives, and a sequence in which selected leaders vote before other agents. On data from the 117th-118th U.S. House, its GPT-4o-mini variant reports 91.3-92.1% accuracy across three chronological splits, exceeding five representation-learning baselines. The results support the predictive usefulness of the combined design in this dataset; generated explanations and module ablations do not establish that it reproduces legislators' actual decision processes.

## Research Question

Can profiled LLM agents predict roll-call votes with limited observed voting history while producing human-readable explanations and incorporating a specified leadership influence mechanism?

## Motivation

The paper positions [[concepts/llm-based-roll-call-vote-prediction|LLM-Based Roll-Call Vote Prediction]] as an alternative to learning politician and bill embeddings. Its motivation is to incorporate heterogeneous profile information through prompts, reduce the need for task-specific training, and express predictions in political terms. The proposed benefit is flexibility in available inputs; it still depends on pretrained models, collected profiles, and inference resources.

## Contributions

- A role-based profile combining personal information, constituency characteristics, sponsorship activity, and observed votes.
- Multi-view planning using trustee, delegate, and party-follower perspectives.
- A leader-first prediction sequence that inserts predicted leader votes into other agents' prompts.
- Comparisons with five baselines, module and profile ablations, identity perturbations, profile-length analysis, and repeated-run consistency checks.

## Method

### Profiles and Planning

Each legislator receives personal details such as party and committee affiliations, constituency statistics, sponsorship and cosponsorship information, and 20 voting records sampled from the training partition. PAA does not fit a task-specific model: the records enter the prompt as context.

The planning module reasons from three perspectives before synthesizing a vote. The trustee perspective emphasizes the legislator's judgment about policy; the delegate perspective emphasizes constituents' wishes; the follower perspective emphasizes party leadership. These are prompt-defined reasoning roles, not separately measured psychological traits.

### Leader-First Action

The leader set contains the Speaker, Republican and Democratic leaders, the relevant committee chair, and members of caucuses related to the bill. Writing this set as $L$, the remaining agents as $O$, and the planning operation as $p$, the paper defines

$$
V_l=p(L),\qquad V_o=p(O\mid V_l).
$$

Leader votes are model predictions. They are added to the remaining agents' prompts before those agents decide. The mechanism therefore specifies an information dependency between predictions; its predictive performance does not independently identify real political influence.

PAA uses Llama-3-70B ($\mathrm{PAA}_L$) or GPT-4o-mini ($\mathrm{PAA}_G$). The former runs on four NVIDIA RTX A6000 GPUs; the latter uses an API. Despite collecting Twitter data for the broader comparison, the authors state that PAA itself does not use social-media inputs.

## Experiments

### Data and Main Comparison

The dataset covers 432 legislators in the 117th-118th House. Additional inputs include legislator Wikipedia pages current as of March 2024, constituency pages, and sponsorship information. Chronological train/validation/test partitions are 20/40/40, 40/30/30, and 60/20/20. PAA samples its 20 historical votes per agent from the training portion and evaluates directly on the test portion. The three outcome classes are support, opposition, and abstention.

Table 1 reports accuracy and macro-F1 on a percentage scale, as means and standard deviations over five runs. Each cell below is accuracy / macro-F1; `+/-` denotes the reported standard deviation.

| Method | 20/40/40 | 40/30/30 | 60/20/20 |
| --- | --- | --- | --- |
| ideal-vector | 80.9 +/- 0.12 / 79.2 +/- 0.13 | 82.2 +/- 0.23 / 80.6 +/- 0.36 | 86.1 +/- 0.32 / 84.4 +/- 0.25 |
| LSTM+GCN | 83.5 +/- 0.13 / 82.5 +/- 0.12 | 85.3 +/- 0.12 / 83.2 +/- 0.35 | 87.8 +/- 0.08 / 85.2 +/- 0.12 |
| Vote+MTL | 83.2 +/- 0.04 / 83.5 +/- 0.12 | 84.2 +/- 0.20 / 84.3 +/- 0.03 | 89.5 +/- 0.14 / 86.2 +/- 0.06 |
| PAR | 85.3 +/- 0.11 / 80.2 +/- 0.12 | 85.8 +/- 0.12 / 85.2 +/- 0.12 | 90.2 +/- 0.23 / 87.5 +/- 0.03 |
| UPPAM | 86.5 +/- 0.10 / 80.5 +/- 0.07 | 88.5 +/- 0.03 / 85.9 +/- 0.03 | 91.7 +/- 0.08 / 86.3 +/- 0.09 |
| PAA-L | 85.9 +/- 0.10 / 87.2 +/- 0.08 | 85.7 +/- 0.10 / 88.1 +/- 0.07 | 87.7 +/- 0.05 / 89.6 +/- 0.05 |
| PAA-G | 91.8 +/- 0.15 / 92.2 +/- 0.10 | 91.3 +/- 0.20 / 91.7 +/- 0.12 | 92.1 +/- 0.10 / 93.0 +/- 0.12 |

PAA-G exceeds the strongest baseline accuracy by 5.3, 2.8, and 0.4 percentage points across the three splits. PAA-L exceeds all five baselines in macro-F1, but not in accuracy. The GPT variant is therefore responsible for the paper's across-the-board best results. Because the partitions change test coverage as well as training size, cross-split trends are not a controlled training-size comparison on a fixed test set.

### Ablations and Identity Perturbations

Tables 2-3 evaluate PAA-G on the 20/40/40 split. The following table gives reported means; the source also supplies standard deviations.

| Variant | Accuracy | Macro-F1 |
| --- | --- | --- |
| Full PAA-G | 91.8 | 92.2 |
| Without profile | 78.6 | 73.4 |
| Without planning | 80.1 | 74.1 |
| Without action mechanism | 80.7 | 74.2 |
| Anonymized legislator names and bill numbers | 90.8 | 91.3 |
| Swapped legislator names across differing stances | 90.1 | 90.7 |
| Without personal information | 82.9 | 76.3 |
| Without constituency information | 90.9 | 91.3 |
| Without sponsorship information | 83.6 | 78.9 |
| Without voting records | 83.4 | 77.8 |

Removing any complete module substantially reduces performance, with profile removal producing the largest loss. Constituency information has the smallest removal effect among profile components. Anonymization and name swapping reduce accuracy by 1.0 and 1.7 points, respectively. These perturbations show that predictions retain substantial accuracy despite altered identifiers; they do not eliminate possible exposure to bill content or political facts during pretraining.

### Profile Length, Consistency, and Explanations

The authors describe Figure 3 as showing deterioration when all training votes are placed in the prompt, compared with sampling 20 records. Exact plotted values are unavailable in the supplied Markdown. Its prose describes sampled-profile improvement as training grows, but Table 1 is not strictly monotonic for either model's accuracy. The supported qualitative finding is that more prompt history did not reliably help.

For consistency, the study samples 50 legislator-bill pairs and repeats predictions 20 times. The authors report more stable outputs from Llama-3-70B and more correct predictions from GPT-4o-mini, without a numerical agreement statistic in the supplied text. Figure 5 supplies an illustrative multi-perspective explanation; the text does not report an independent evaluation of explanation faithfulness.

## Limitations

- The authors identify limited data-source coverage, restriction to roll-call prediction, and unresolved hallucination as limitations. Other countries and downstream tasks are proposed extensions, not evaluated outcomes.
- Reduced training fractions do not constitute a dedicated held-out-legislator test. Applicability to newly elected legislators remains an extrapolation.
- Chronological vote partitions do not by themselves ensure temporally available profile inputs: the paper uses Wikipedia snapshots from March 2024. The supplied text does not establish snapshot alignment to each predicted vote or exclusion of relevant facts from model pretraining.
- Consistent outputs can still be wrong. Identity perturbations, repeatability, predictive fit, and plausible explanations test different properties; none alone validates the simulated human decision process. This distinction connects to [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]].
- The supplied Markdown omits the appendix prompts mentioned in the method and does not state the total number of bills or votes, exact temporal cutoffs, per-class results, or a measured runtime/cost comparison. These omissions limit replication and assessment of efficiency claims.
- No publication year, venue, DOI, or identifier for this paper appears in the supplied Markdown. The year is left null; no identifier is inferred from reference dates or dataset coverage.

## Related Concepts

- [[concepts/llm-based-roll-call-vote-prediction|LLM-Based Roll-Call Vote Prediction]]: the profile, reasoning, and interaction approach developed here.
- [[concepts/issue-adjusted-ideal-points|Issue-Adjusted Ideal Points]]: an alternative way to connect legislative context to interpretable voting predictions through latent positions and issue offsets.
- [[concepts/validity-boundaries-for-llm-social-simulations|Validity Boundaries for LLM Social Simulations]]: distinguishes successful prediction from broader claims about simulated political behavior.

## Related Papers

- Kraft, Jain, and Rush (2016), "An embedding model for predicting roll-call votes": cited source for the ideal-vector baseline.
- Feng et al. (2022), "PAR: Political actor representation learning with social context and expert knowledge": cited graph-based baseline using contextual knowledge.
- Mou et al. (2023), "Uppam: A unified pre-training architecture for political actor modeling based on language": cited pretraining baseline.
- [[papers/how-they-vote-issue-adjusted-models-of-legislative-behavior|How They Vote: Issue-Adjusted Models of Legislative Behavior]]: related Wiki reading, not a citation in this manuscript; uses topic-conditioned latent positions to analyze legislative heterogeneity.
- [[papers/llm-based-social-simulations-require-a-boundary|LLM-Based Social Simulations Require a Boundary]]: related Wiki reading, not a citation in this manuscript; develops criteria for bounding behavioral claims from LLM simulations.

[[index|Library home]]
