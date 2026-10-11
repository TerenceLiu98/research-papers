---
title: "Legislative Effectiveness in the American States"
type: paper
authors:
  - Peter Bucchianeri
  - Craig Volden
  - Alan E. Wiseman
year: 2024
doi: "10.1017/S0003055424000042"
tags:
  - legislative-politics
  - political-measurement
  - state-politics
  - institutional-design
---

## TL;DR

The paper constructs 80,344 State Legislative Effectiveness Scores (SLES) across 97 U.S. state legislative chambers and 1,032 chamber-sessions, using about 1.8 million bills from 1987 to 2018. The scores combine sponsorship, progress through five legislative stages, and substantive significance. Validation and observational analyses support their usefulness for studying relative lawmaking influence: majority-party advantages are larger with ideological polarization, majority cohesion, and closely divided chamber control. Institutional resources and rules are also associated with differences in effectiveness, but these relationships do not establish causal effects of institutional reform.

## Research Question

How can individual legislators' effectiveness be measured consistently across American state legislatures, and how do partisan conditions and institutional arrangements relate to the distribution of lawmaking influence?

## Motivation

Earlier state-level measures often relied on subjective surveys, limited cross-sections, or bill passage rates. A broader measure of [[legislative-effectiveness|Legislative Effectiveness]] can recognize progress short of enactment and distinguish major policy proposals from commemorative bills. Variation across states also permits examination of legislative theories beyond Congress.

## Contributions

- Introduces a large chamber-term dataset with fifteen component indicators: five legislative stages crossed with three significance categories.
- Combines coding checks, an external subjective benchmark, temporal stability, and expected legislator-level associations to assess validity.
- Uses chamber-level effectiveness gaps to examine [[conditional-party-government|Conditional Party Government]] and the insecure-majorities hypothesis.
- Separates salaries, session length, and staffing to show how an aggregate professionalism index can obscure distinct associations with lawmaking influence.

## Method

State legislative archives supply sponsors, bill summaries, and legislative histories. State-specific dictionaries identify bill progress and commemorative proposals; newspaper mentions from LexisNexis and NewsBank help identify substantively significant legislation. Coverage begins in the late 1980s for some states and is nearly complete across states from 2003 onward.

For each legislator and two-year term, the authors count bills introduced (BILL), receiving action in committee (AIC), receiving action beyond committee (ABC), passing the originating chamber (PASS), and becoming law (LAW). At each stage, commemorative, substantive, and substantive-and-significant bills receive weights 1, 5, and 10, respectively. Writing these weighted counts as $W_{its}$ gives the equivalent compact score:

$$
\mathrm{SLES}_{it}=\frac{N}{5}\sum_{s\in\{\mathrm{BILL,AIC,ABC,PASS,LAW}\}}\frac{W_{its}}{\sum_{j=1}^{N}W_{jts}}.
$$

Each stage contributes an equal share to the aggregate; because fewer bills reach later stages, an individual bill's progress there typically contributes more. Scores average 1 within each chamber-term. They measure relative shares of lawmaking activity, not absolute productivity or portable estimates of individual skill.

Individual-level OLS models use 72,888 observations with available covariates, term and state-chamber fixed effects in the pooled specification, and standard errors clustered by legislator. Chamber-level models examine majority-minus-minority median SLES and the share of majority legislators exceeding the minority median. Institutional analyses additionally examine chair-minus-rank-and-file and senior-minus-freshman median gaps. Chamber-level standard errors are clustered by state chamber.

## Experiments

These are validation exercises and observational studies, not randomized experiments.

### Measurement Validation

- Research assistants checked 49,037 sampled bills: 46,693 (95.2%) were correctly coded by the penultimate code. Targeted corrections raised reported agreement with hand coding above 99%; this is a post-correction agreement figure, not an independent held-out accuracy estimate.
- Against North Carolina Center for Public Policy Research rankings for 2005-2012, SLES alone explains approximately half the ranking variation and outperforms alternative passage-rate metrics on the reported fit criteria.
- Scores are positively correlated across consecutive terms, especially under unchanged majority control. Seniority, committee chairs, and majority status predict higher scores. The prose reports a majority-party coefficient of 0.370, about 58% of the minority-party mean of 0.636 (Table 1).

### Partisan Advantage

Table 2 uses 868 and 874 chamber-term observations for its two outcomes. A one-standard-deviation increase in polarization (0.48) is associated with a 0.075-point larger median partisan SLES gap and roughly a 3.5-percentage-point increase in the share of majority legislators outperforming the minority median. A one-standard-deviation decrease in majority ideological heterogeneity is associated with a 0.10-point larger gap and about a 4-percentage-point increase in that share. Narrower partisan seat margins also predict larger majority advantages, consistent with the insecure-majorities hypothesis.

### Institutional Design

Table 3 includes 776-818 observations depending on the outcome. Higher salaries are associated with smaller seniority gaps in both parties; longer sessions with larger majority and committee-chair advantages; and more staff per legislator with smaller chair advantages. Chamber votes on committee appointments are associated with a smaller chair advantage. Calendar control predicts a larger partisan gap, whereas committee gatekeeping is not statistically significant in this specification. Several other findings are only suggestive: for example, the term-limit association with a smaller majority-party seniority gap reaches the 10% threshold, not 5%.

## Limitations

- The measure covers advancement of sponsored legislation. It omits oversight, constituency service, obstruction, and other contributions to representation; behind-the-scenes leadership may therefore differ from measured sponsorship effectiveness.
- Chamber-term normalization makes direct comparisons of individual scores across states or eras inappropriate. Comparisons of relative group advantages are more defensible, but scores do not measure overall legislative productivity.
- State-specific attribution and coding decisions remain consequential. External criterion validation is confined to North Carolina, and temporal stability or expected correlations do not isolate intrinsic legislator ability from institutional circumstances.
- Institutional design analyses are explicitly exploratory and vulnerable to endogeneity: already-powerful actors may select the rules and resource allocations associated with their advantages.
- Gender and racial differences require further analysis of institutional exclusion, issue agendas, and intersectionality; lower scores should not be read as evidence of lower inherent ability.
- The supplied Markdown contains misaligned Table 1 labels and malformed mathematical text. This summary uses the explanatory prose to disambiguate the reported weights and majority-party coefficient. Supplementary analyses are described only as reported in the main text.

## Related Concepts

- [[legislative-effectiveness|Legislative Effectiveness]]
- [[conditional-party-government|Conditional Party Government]]
- [[political-polarization|Political Polarization]]: the study uses distance between party ideological medians, distinct from affective polarization.

## Related Papers

- Volden and Wiseman (2014), *Legislative Effectiveness in the United States Congress: The Lawmakers*: the measurement approach adapted to state legislatures.
- Aldrich and Battista (2002), "Conditional Party Government in the States": a theoretical antecedent for the party-cohesion and polarization analysis.
- Anzia and Jackman (2013), "Legislative Organization and the Second Face of Power: Evidence from U.S. State Legislatures": source of procedural-rule measures and a related analysis of agenda control.
- [[validating-estimates-of-latent-traits-from-textual-data-using-human-judgment-as-a-benchmark|Validating Estimates of Latent Traits From Textual Data Using Human Judgment as a Benchmark]]: a methodological connection within this library concerning external human benchmarks, not a citation made by this paper.

Article: [DOI](https://doi.org/10.1017/S0003055424000042). Replication data, as identified in the paper: [APSR Dataverse](https://doi.org/10.7910/DVN/NT7H5O).

[[index|Library home]]
