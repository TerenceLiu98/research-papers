---
title: "Global flood research patterns, disparities, and risk-attention mismatches revealed by large language models"
type: paper
authors:
  - Xinan Zhang
  - Zhou Chen
  - Zimeng Wang
  - Fan Yang
  - Lingyu Wang
  - Shuhan Lou
  - Yuanhong Liao
  - Wenrui Li
  - Mingrun Zang
  - Yuqi Bai
year: 2026
doi: "10.1080/20964471.2026.2676422"
tags:
  - flood-risk
  - bibliometrics
  - research-inequality
  - large-language-models
---

## TL;DR

An analysis of 64,989 flood-related publications from 1980 to June 2025 finds that flood scholarship has moved from hydrological and engineering questions toward integrated risk governance and climate adaptation, while remaining geographically unequal. The paper reports that 53.1% of countries receive research attention disproportionate to their flood exposure and that national attention is associated more strongly with economic capacity than with affected population. Its LLM-derived classifications are useful structured approximations, not complete measurements of global flood knowledge.

## Research Question

How does the global flood-research system vary across time, countries, governance themes, and flood types, and where does scholarly attention diverge from the geographic distribution of flood risk?

## Motivation

Counts of publications can show where disaster research occurs but reveal less about the internal structure of that knowledge. Flood threats, monitoring capacity, and research resources are unevenly distributed, so the paper asks whether countries facing severe exposure also receive broad and proportionate scientific attention. This distinction matters because a large literature concentrated on a few hazards or governance pathways may still leave important local risks poorly understood.

## Contributions

- Builds a global corpus of 64,989 flood-related publications from OpenAlex and Web of Science and extracts study areas and flood types from abstracts with Qwen-2.5-32B-Instruct.
- Traces changes in dominant topics from 1980 onward and organizes research into seven Integrated Flood Management components and 30 LDA-derived subthemes.
- Compares national thematic portfolios with a global reference distribution and maps geographic clusters for six flood types.
- Defines a residual-based bias index to identify [[concepts/research-attention-risk-mismatch|Research Attention-Risk Mismatch]] and uses country and year fixed effects to examine correlates of relative flood-research output.

## Method

The authors retrieve records containing "flood" in their titles from OpenAlex for 1980 through June 2025, screen abstracts semantically to exclude unrelated meanings, and supplement the corpus with Web of Science records. Qwen-2.5-32B-Instruct extracts standardized country or city study areas and assigns one or more of six flood types: riverine, pluvial, flash, dam-break, snowmelt, and storm-surge floods. It also classifies studies under seven Integrated Flood Management pathways. A stratified manual check of 500 abstracts reports 94.4% accuracy for study-area extraction and 87.8% for flood-type classification.

Separate latent Dirichlet allocation models identify the two leading topics in five time intervals and 30 subthemes within the management pathways. The paper measures deviation of each country's seven-component portfolio from the unweighted global mean with Jensen-Shannon divergence. Getis-Ord Gi* statistics describe spatial clustering of research by flood type.

For attention relative to risk, a cross-country OLS regression predicts log publication counts from the log number of people affected by floods in EM-DAT. Each country's residual is the bias index: positive values mean more publications than predicted by exposure and negative values mean fewer. Two-way fixed-effects panel regressions then relate the logit of flood publications as a share of national environmental-science output to affected population, GDP per capita, research-and-development expenditure, and population density, with country-clustered standard errors.

## Experiments

Publication volume grows sharply after 2000. The leading themes progress from hydrological estimation and flood frequency, through engineering and flood control, toward urban resilience, integrated modeling, risk governance, and climate adaptation. Publications focused on developing regions reach roughly 1,800 in 2023 and exceed those focused on developed regions for the first time that year.

National portfolios do not converge on one management pattern. China retains strong engineering themes while increasing community-oriented work; the United States and United Kingdom emphasize ecological, planning, and governance pathways; India combines machine-learning prediction with vulnerable-group evacuation; and Indonesia emphasizes community mobilization. High portfolio divergence has different interpretations: in Iraq and Kenya it coincides with high risk and limited output, while in Finland and Iceland it is plausibly related to snowmelt specialization.

The paper reports attention-risk mismatch for 53.1% of countries. Developed countries generally receive more attention than their risk predicts, while much of Africa and South America is underrepresented. Reported negative bias-index examples include Panama (-1.033), Nicaragua (-0.964), Guatemala (-0.797), South Sudan (-0.737), and the Democratic Republic of Congo (-0.670). Within-country maps also show concentration around economic and urban centers.

In the global fixed-effects model, affected population is not significantly associated with relative flood-research attention ($\beta=0.012$, $p=0.506$). GDP per capita is positive and significant ($\beta=1.453$, $p<0.001$), as is population density ($\beta=2.958$, $p=0.012$); R&D expenditure is not significant ($p=0.540$). These are conditional associations, not causal effects of wealth or exposure on research production.

## Limitations

- The corpus is 97.44% English and excludes gray literature, government reports, technical documents, and local hazard inventories. Apparent gaps may therefore include indexing and language gaps rather than absence of locally useful knowledge.
- Extraction uses abstracts rather than full texts. Rural areas and local-language place names may be missed, and the reported 87.8% flood-type accuracy leaves meaningful classification error, especially for compound causes.
- Mapping studies into predefined flood types and management components compresses thematic nuance. LDA topics and their LLM-assisted aggregation should be interpreted with the broader cautions in [[concepts/topic-model-evaluation|Topic Model Evaluation]].
- Affected population is only one proxy for flood risk. The bias index depends on that measure and on a log-linear cross-country benchmark, while the panel regressions establish associations rather than causal mechanisms.
- Explanations involving donor priorities, conflict, institutional capacity, or national traditions are contextual interpretations; the statistical models do not directly identify those mechanisms.
- The 2025 publication record was incomplete, so temporal figures stop at 2024 even though retrieval continued through June 2025.

## Related Concepts

- [[concepts/research-attention-risk-mismatch|Research Attention-Risk Mismatch]]
- [[concepts/topic-model-evaluation|Topic Model Evaluation]]

## Related Papers

- Stein et al. (2024), "Wealth over woe: Global biases in hydro-hazard research": cross-hazard evidence that wealth and data availability predict research density more strongly than hazard impacts.
- Miao et al. (2024), "Hydrological research evolution: A large language model-based analysis of 310,000 studies published globally between 1980 and 2023": a broader LLM-based synthesis of hydrological research evolution.
- Winsemius et al. (2016), "Global drivers of future river flood risk": projections used to contextualize future exposure in regions currently receiving limited research attention.

[[index|Library home]]
