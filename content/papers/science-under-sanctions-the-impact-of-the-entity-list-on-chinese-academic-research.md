---
title: "Science under sanctions: The impact of the entity list on Chinese academic research"
type: paper
authors:
  - Xiaodie Pu
  - Xintong Wang
  - Di Tong
  - Alain Yee Loong Chong
year: 2026
doi: 10.1016/j.respol.2026.105584
tags:
  - science-policy
  - research-productivity
  - sanctions
  - difference-in-differences
---

## TL;DR

A matched, stacked event study of Chinese researchers reports fewer publications but higher citation scores and journal impact factors after their institutions enter the U.S. Entity List. Topic diversification and new institutional partnerships are consistent with adaptation to restricted research inputs. The U.S. coauthor share does not change significantly. These findings concern selected, continuously active researchers, predominantly at elite universities; they do not establish that sanctions improve science overall or causally identify the proposed mediation channels.

## Research Question

How does Entity List inclusion affect the quantity and measured impact of Chinese academic research, and do changes in research topics and collaboration networks help explain these effects?

## Motivation

The paper distinguishes restrictions on material research inputs from policies directly targeting researchers or collaboration. Its proposed mechanism is that disrupted access to equipment and software prompts exploration and new partnerships: learning and coordination costs can reduce output while new knowledge combinations increase impact. Measuring quantity and impact separately can therefore reveal changes obscured by a single productivity indicator (Sections 1-2).

## Contributions

- Estimates researcher-level outcomes around institution-level sanctions across four listing cohorts.
- Separates publication volume from citation-network and journal-impact measures.
- Examines topical and institutional diversification, collaboration geography, and interviews as complementary mechanism evidence.
- Reports disciplinary and institutional boundary conditions, including a contrasting pattern among corporate researchers.

## Method

The Open Academic Graph supplies English-language research outputs and collaboration records. From 136 listed academic entities, exclusions for corporate affiliations, military ties, and late listing leave 22 institutions: 10 universities and 12 research institutes, listed in 2012, 2015, 2020, or 2021. Institutional comparisons use Project 211 universities and research institutes selected through collaboration relationships. Researchers must publish before and after treatment and have at least three outputs across the observation window (Section 3.2).

Cohort-specific coarsened exact matching uses pretreatment productivity, coauthor counts, topic breadth and deviation, U.S. collaboration, career age, and STEM status. The matched sample contains 18,169 treated and 125,969 control researchers. The main regressions report 1,121,850 stacked observations; these are not unique researchers.

The [[concepts/stacked-event-studies|Stacked Event Studies]] design pools cohort-specific comparisons over event years -3 through +3, with researcher-by-cohort and year-by-cohort fixed effects. Treatment follows institutional affiliation. Controls include collaboration measures and career characteristics. The paper excludes already-treated comparisons and reports never-treated-only and Callaway-Sant'Anna estimates as checks (Sections 3.4 and 4.2).

Publication count measures output volume. Weighted publication count sums fractional credits, each equal to one divided by the product of author count and unique institution count. Impact factor averages journals' JCR impact factors, excluding outputs without one. Citation score combines a three-year citing-paper neighborhood, citation-degree normalization, and abstract-similarity weights. All productivity outcomes except impact factor are log-transformed. Citation score is not a raw citation count, and these impact measures are proxies for research quality (Section 3.3).

## Experiments

### Main Estimates

Table 2 reports the following treatment-by-post coefficients with controls:

| Outcome | Coefficient | Reported robust standard error |
| --- | ---: | ---: |
| Log citation score | 0.0164 | 0.003 |
| Journal impact factor | 0.1400 | 0.021 |
| Log publication count | -0.0078 | 0.001 |
| Log weighted publication count | -0.0016 | 0.000, rounded |

The narrative reports all four as significant at p < 0.001. The parsed table's significance legend is damaged, so precise thresholds here follow the prose. The summary retains coefficients rather than converting them into percentages because the supplied text does not fully specify the log transformation at zero. Event-study plots are described as showing small pretreatment differences and effects persisting through three post-sanction years (Section 4.1).

### Mechanisms and Boundary Conditions

[[concepts/research-diversification|Research Diversification]] increases across topic breadth, keyword dissimilarity, annual topic deviation, and institutional coauthor diversity. Topics are inferred with a hierarchical Dirichlet process; abstract embeddings provide an additional measure of year-to-year change. Topic deviation peaks immediately after sanctions, becomes marginal by year two (p = 0.093), and is insignificant by year three (p = 0.174). Persistent impact gains therefore coexist with a temporary measured exploration response (Section 5.1).

Table 4 reports increases in coauthor shares from non-listed Chinese institutions (0.0190), NATO countries excluding the U.S. (0.0020), and Global South countries (0.0025). The U.S. share is statistically unchanged. Table 5 associates greater non-listed collaboration with higher citation scores and impact factors and fewer publications; its weighted-count association is insignificant. These associations support, but do not isolate, mediation through collaboration. An unchanged share also does not prove that individual ties or absolute collaboration counts are unchanged.

Sixteen convenience-sampled interviews describe domestic substitutes, collaborations providing access to equipment, and reprioritization of projects. Interviewees also mention institutional or government funding support, leaving another possible explanation for impact gains (Section 5.3).

Robustness checks reportedly preserve the main pattern under never-treated controls, alternative DiD estimation, exclusion of prior collaborators of treated institutions, five-year windows, propensity-score matching, and placebo timing. Never-treated-only estimates imply somewhat larger quantity declines, consistent with mild anticipation in the hybrid controls. Non-STEM results differ: citation scores rise, raw counts and impact factors do not change significantly, and weighted counts rise. Stricter licensing review is associated with stronger effects (Section 4.2).

A post hoc analysis of 176,062 Chinese AI patents filed in 2015-2025 associates greater reliance on papers from sanctioned institutions with more forward patent citations; this is not a causal estimate of sanctions on innovation. A separate corporate sample of 2,394 treated and 10,990 control researchers instead shows declining impact measures and no significant quantity change (Section 6).

## Limitations

The active-researcher restriction conditions on post-treatment publication and omits exits and new entrants. Elite institutional resources, English-only outputs, and a sample that is about 98% STEM constrain generalization. More extensive sanctions or weaker access to alternative partners could produce different responses. Three post-treatment years do not establish durable benefits (Section 8).

Matching and small pretreatment differences support comparability but do not prove parallel untreated trends. Sanctions occur at the institution level, while table notes describe only robust standard errors; the supplied text does not establish whether inference accounts for institution-level dependence. Contemporaneous collaboration controls may themselves respond to sanctions. These are interpretation cautions rather than additional findings reported by the authors.

Bibliometric impact is not equivalent to scientific validity, novelty, or social value. Fractional publication credit decreases mechanically with larger teams and more participating institutions. Interviews and mediator-outcome associations cannot rule out funding changes or other adaptation mechanisms. The patent and corporate comparisons likewise do not by themselves eliminate confounding or spillovers.

The supplied Markdown references supplementary Appendices A-F but does not include their contents. Supplementary robustness results are summarized from the main text and were not independently inspected. Citation-score implementation details and damaged mathematical/table notation also limit reproducibility from this source alone. Data are available on request according to the paper.

Source metadata: the [article DOI](https://doi.org/10.1016/j.respol.2026.105584) appears in the supplementary-data statement. The year above follows its 2026 component; the supplied text has no separate publication-date header.

## Related Concepts

- [[concepts/research-diversification|Research Diversification]]: distinguishes portfolio breadth, trajectory changes, and partner diversity.
- [[concepts/stacked-event-studies|Stacked Event Studies]]: organizes cohort-specific comparisons around staggered institutional listing.
- [[concepts/text-embedding-models|Text Embedding Models]]: supply semantic similarities for citation weighting and research-trajectory measures.
- [[concepts/social-network-analysis|Social Network Analysis]]: distinguishes institutional and geographic collaboration composition from tie persistence.

## Related Papers

- Flynn et al. (2024), "Building a Wall around Science: The Effect of US-China Tensions on International Scientific Research": cited comparison examining broader geopolitical tensions.
- Jia et al. (2024), "The impact of US-China tensions on US science: Evidence from the NIH investigations": cited contrast involving a different policy instrument and researcher population.
- Furman and Teodoridis (2020), "Automation, research technology, and researchers' trajectories: Evidence from computer science and electrical engineering": cited basis for disruption-driven exploration.
- [[papers/the-paradox-of-competition-how-funding-models-could-undermine-the-uptake-of-data-sharing-practices|The paradox of competition: How funding models could undermine the uptake of data sharing practices]]: a library comparison, not a citation in this paper, examining adaptive scientific behavior under resource incentives using simulation rather than a policy event study.

[[index|Library home]]
