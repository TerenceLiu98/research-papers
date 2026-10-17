---
title: Are Firms Gerrymandered?
type: paper
authors:
  - Joaquín Artés
  - Aaron R. Kaufman
  - Brian K. Richter
  - Jeffrey F. Timmons
year: 2024
doi: "10.1017/S0003055424000558"
source_job_id: 7ba322b8-9a79-40e9-8b1b-50a40b9d7486
tags:
  - redistricting
  - gerrymandering
  - corporate-political-power
---

## TL;DR

Partisan mapmakers allocate publicly traded firms' headquarters disproportionately to their own party's congressional districts. Comparing 18 plans across 14 states with 50,000 simulated maps per state, the authors find that **8 of 12 partisan plans exhibit firm gerrymandering even conditional on seat totals**. This separates resource allocation from seat maximization in some states, although the two remain observationally indistinguishable in others.

## Research Question

Do mapmakers draw district boundaries to capture firms as political resources, and can this allocation be distinguished from the firms acquired incidentally by winning additional seats?

## Motivation

Firms can supply campaign contributions, opportunities for credit claiming, policy information, employee mobilization, and connections to influential committees. Redistricting can therefore align politicians with valuable economic actors as well as voters. Evaluating maps solely by seats can miss this dimension of political advantage.

## Contributions

- Develops a theory of [[concepts/firm-gerrymandering|Firm Gerrymandering]], extending the objects of redistricting beyond voters.
- Uses joint seat-and-firm distributions and seat-conditional comparisons to distinguish extreme firm allocations from seat-driven outcomes.
- Compares partisan, commission, and court maps using [[concepts/redistricting-ensembles|Redistricting Ensembles]] that account for geographic constraints.
- Documents firm advantages without corresponding seat advantages, motivating a multidimensional account of mapmakers' objectives.

## Method

### Data and Counterfactual Maps

The study links MGGG precinct geography, population, racial and ethnic composition, and electoral data to geolocated COMPUSTAT headquarters of publicly traded U.S. firms. Its 18 plans in 14 states include partisan maps, commission maps, and court replacements, mostly associated with the 2012 cycle. Availability of precinct data determines state inclusion.

Sequential Monte Carlo generates 50,000 plans per state under population and geographic requirements, including contiguity, compactness, county-boundary constraints, and majority-minority districts. These ensembles supply a reference distribution conditional on the implemented constraints. Precinct votes averaged over up to four nearby elections estimate latent partisan support. Each district's simple two-party majority determines its party, and headquarters inside that district are assigned to that party.

### Unconditional and Conditional Tests

The unconditional statistic is the proportion of firms in Democratic-majority districts, compared with its simulated distribution. Low-tail outcomes favor Republicans; high-tail outcomes favor Democrats. The paper uses one-sided tail comparisons, including a 0.10 threshold in its illustrative classification.

The conditional analysis restricts comparison to simulated maps producing the enacted seat allocation. An extreme firm count within this subset provides evidence of targeting beyond the number of seats won. It does not eliminate every alternative mapmaking objective or establish intent directly. Narrow conditional support can prevent meaningful separation of firm and seat targeting.

The stylized New Gerryland example makes the distinction concrete: among plans giving Democrats two of five seats, their firms range from 32 to 57 out of 100. Identical seat totals can therefore conceal substantial differences in corporate representation.

## Experiments

This is an observational comparison with simulated counterfactual maps, not a randomized intervention.

### Overall Findings

Of 12 partisan plans, six meet the paper's criteria for both unconditional and conditional firm gerrymandering, and four additional plans meet one of these criteria. Eight meet the conditional criterion; six are seat gerrymanders favoring the mapmakers under the same evidentiary standard. Wisconsin is a notable case without apparent firm gerrymandering.

Relative to simulated medians, mapmakers' parties receive **324 additional firms**, approximately **12% of 2,800 firms** in partisan-map states. Relative to the authors' estimated 665 firms feasibly available for favorable reallocation, this represents approximately **49%**. These are sample summaries, not nationwide causal estimates.

Court replacements move unconditional firm allocations toward the simulated center in all four within-state comparisons. Arizona's insulated commission produces a central allocation. Iowa is an exception to a blanket commission-neutrality claim: its commission permits a legislative veto, and its reported unconditional Republican-favoring p-value is 0.094.

### Three Diagnostic Cases

| State | Reported allocation and comparison | Interpretation |
| --- | --- | --- |
| Oregon | Democrats receive 4 of 5 seats and 44 of 48 firms; seat p = 0.058 and unconditional firm p = 0.063. Among 2,893 four-seat simulations, firms range only from 43 to 45. | Extreme firms and seats coexist, but firm targeting cannot be separated from seat maximization. |
| Pennsylvania | Democrats receive 4 of 18 seats and 114 firms. Only 50 of 50,000 simulations yield four Democratic seats; within these, firms range from 111 to 207 and only four plans are more extreme. | Evidence of firm targeting even within a very favorable Republican seat allocation. |
| Texas | Democrats receive 11 of 36 seats and 215 firms. The paper reports unconditional firm p = 0.084 and conditional p = 0.021, rounded to 0.02 later. | Firms favor Republican mapmakers despite the absence of an aggregate Republican seat gerrymander under the paper's test. |

### Reported Robustness

The authors report that extreme-bounds checks perturbing vote shares in marginal districts leave the main conclusions intact, while exposing risks from spreading voters thinly. They also report a precinct analysis controlling for racial composition, urban/rural status, and high-income households that supports targeting of headquarters-containing precincts. These supplementary analyses are described in the main text; their full appendices are absent from the supplied Markdown.

## Limitations

- **Coverage:** Publicly traded headquarters are a politically salient subset of firms. Fourteen data-available states do not establish nationwide prevalence, and the sample provides more leverage for Republican-controlled states than Democratic-controlled ones.
- **Counterfactual assumptions:** Results depend on simulation constraints and assumed precinct voting behavior. Averaging elections and sensitivity checks reduce dependence on particular elections without removing district, ballot-item, or temporal invariance assumptions.
- **Intent and omitted objectives:** Seat conditioning separates firm counts from seat totals, but other co-located resources and mapmakers' priorities can still matter. Oregon illustrates a lack of identifying variation.
- **Aggregation:** Statewide party totals miss redistribution among incumbents of the same party and district-level targeting. The main statistic largely treats firms as equally valuable.
- **Downstream effects:** Incumbency advantage, lobbying changes, and business-oriented policy are proposed implications, not outcomes directly established by this analysis.
- **Source consistency:** Table 1 lists 327 Pennsylvania firms and 668 Texas firms, whereas the case-study prose gives 401 and 715. Georgia's unconditional classification also differs between passages. These discrepancies are unresolved; the case comparisons above avoid those total counts and do not classify Georgia unconditionally.
- **Source completeness:** The supplied text includes the article and references but lacks the supplementary appendices and numbered footnote text. Several figure extractions are incomplete, so detailed results are taken from explicit prose rather than reconstructed from damaged tables.

## Related Concepts

- [[concepts/firm-gerrymandering|Firm Gerrymandering]]: partisan allocation of corporate locations through district boundaries.
- [[concepts/redistricting-ensembles|Redistricting Ensembles]]: a constrained reference distribution for both unconditional and seat-conditional comparisons.

## Related Papers

- [[papers/redistricting-reforms-reduce-gerrymandering-by-constraining-partisan-actors|Redistricting Reforms Reduce Gerrymandering by Constraining Partisan Actors]]: a complementary library study of institutional constraints and seat outcomes; not cited in this article.
- [[papers/gerrymandering-and-geographic-polarization-have-reduced-electoral-competition|Gerrymandering and geographic polarization have reduced electoral competition]]: a complementary library comparison of geography, seat bias, and competition; not cited in this article.
- McCartan and Imai (2020), "Sequential Monte Carlo for Sampling Balanced and Compact Redistricting Plans": the simulation method cited by the source.
- Chen and Rodden (2013), "Unintentional Gerrymandering: Political Geography and Electoral Bias in Legislatures": motivates distinguishing strategic allocations from geographic baselines.

Article: [10.1017/S0003055424000558](https://doi.org/10.1017/S0003055424000558). Replication data identified in the source: [APSR Dataverse](https://doi.org/10.7910/DVN/TM8ZDB).

[[index|Library home]]
