---
title: "Do Name-Based Treatments Violate Information Equivalence? Evidence from a Correspondence Audit Experiment"
type: paper
authors:
  - Michelangelo Landgrave
  - Nicholas Weller
year: 2022
doi: "10.1017/pan.2020.52"
source_job_id: "a992e970-dfdc-44d2-84bd-da2230c3de92"
tags:
  - experimental-design
  - discrimination
  - causal-inference
---

## TL;DR

Names intended to signal race or ethnicity also change perceived socioeconomic and migrant status. Pairing a name-perception survey with a randomized correspondence audit of 4,460 U.S. state legislators, Landgrave and Weller find that names perceived as working class receive fewer replies. The experiment identifies responses to bundled name cues; attributing those responses solely to racial identity requires [[concepts/information-equivalence|Information Equivalence]].

## Research Question

Do racially distinctive names manipulate only their intended identity characteristic, and are unintended perceptions associated with legislative responsiveness?

## Motivation

Administrative associations between names and demographic characteristics need not capture recipients' perceptions. If a name changes several beliefs simultaneously, random assignment of that name does not isolate the effect of any one belief.

## Contributions

- Pairs perceptions of the same 12 aliases with behavioral responses in a field experiment.
- Documents variation in perceived class and migrant status alongside intended racial signals.
- Shows why adjusting for measured perceptions need not identify separate causal effects of bundled characteristics.

## Method

The studies coincided with the 2018 elections. Twelve male aliases included four each intended to signal white, Black, and Hispanic identities. U.S. MTurk respondents rated perceived gender, race and ethnicity, migrant status, and socioeconomic status. There were 446 unique respondents who rated at least one audit alias, approximately 65 ratings per alias, and 796 observations in Table 1.

The audit randomly assigned names to emails requesting voter-registration help from fictional college-age constituents. The initial frame included 5,735 legislators; after invalid-email exclusions, analysis covered 4,460 legislators in 43 states. Per-name proportions perceived as working class, belonging to racial categories, female, or migrant were linked to reply outcomes. Perception regressions used respondent-clustered standard errors; reply linear probability models used robust standard errors.

## Experiments

| Comparison or model | Reported result |
| --- | --- |
| Black versus white aliases: perceived working class | +12.9 percentage points |
| Hispanic versus white aliases: perceived working class | +13.6 percentage points |
| Hispanic versus white aliases: perceived migrant | +22.5 percentage points |
| Hispanic versus white aliases: reply rate, Table 2 column 1 | −5.7 percentage points, SE 1.8 |
| Black versus white aliases: reply rate, same model | −2.8 percentage points, SE 1.8; not statistically significant |
| Perceived working-class proportion: reply coefficient, column 2 | −0.290, SE 0.077 |

The SES coefficient uses a perception proportion on a 0–1 scale, not a percentage-point unit. Negative SES associations also appear within each racial category in Figure 1. In adjusted models, SES coefficients remain negative (−0.300 and −0.315), as do Hispanic-name or perceived-Hispanic coefficients. Migrant-status coefficients are positive but imprecise (0.328 with SE 0.211; 0.336 with SE 0.208); these do not establish an independent migrant-status effect. Perceived low SES and whiteness correlate at −0.69.

## Limitations

Perceptions were measured among MTurk respondents, not the legislators or staff who answered emails; attempts to elicit elite perceptions proved difficult. Only 12 male aliases supply variation in name-level perceptions. Randomization identifies name-treatment contrasts, while associations with correlated perceived characteristics do not separately identify the causal effects of race, SES, and migrant status. The authors explicitly warn that regression adjustment may not solve this attribution problem. The setting concerns legislative responses to voter-registration requests and does not establish equivalent patterns for every name or institutional context.

## Related Concepts

- [[concepts/information-equivalence|Information Equivalence]]: the central requirement that an informational manipulation leave unintended beliefs unchanged.
- [[concepts/treatment-confounder-separability|Treatment-Confounder Separability]]: a related feature-intervention problem; here the emphasis is on recipients' inferred characteristics.

## Related Papers

- Dafoe, Zhang, and Caughey (2018), “Information Equivalence in Survey Experiments”: supplies the framework applied to name treatments.
- Butler and Homola (2017), “An Empirical Justification for the Use of Racially Distinctive Names to Signal Race in Experiments”: uses administrative characteristics, motivating the present focus on perceptions.
- [[papers/causal-inference-with-latent-treatments|Causal Inference with Latent Treatments]]: examines the related distinction between randomly assigning whole stimuli and identifying effects of their constituent features.

Published in *Political Analysis* 30, 142–148 (2022), online 9 March 2021. Replication data identifier reported in the paper: `10.7910/DVN/4LO1XE`.
