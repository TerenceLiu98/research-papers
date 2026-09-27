---
title: "Tournament-style political competition and local protectionism: Theory and evidence from China"
type: paper
authors:
  - Hanming Fang
  - Ming Li
  - Zenan Wu
year: null
doi: "10.1016/j.jpubeco.2025.105421"
source_job_id: "8bebc418-3386-4779-b11d-e7087a935997"
tags:
  - political-economy
  - promotion-tournaments
  - local-protectionism
  - public-procurement
  - china
---

## TL;DR

[[concepts/promotion-tournaments|Promotion Tournaments]] can discourage economically beneficial exchange when supporting a rival city's firms improves its mayor's promotion prospects. A two-city model predicts stronger [[concepts/local-protectionism|Local Protectionism]] when competitors have similar prior strengths. Chinese city-pair regressions associate smaller gaps in predicted mayoral promotion probabilities with fewer cross-city procurement contracts and less equity investment, especially by local state-owned enterprises. These patterns support the proposed mechanism but do not directly identify welfare losses or eliminate time-varying confounding.

## Research Question

How do competition for political promotion, regional economic spillovers, factional connections, and approaching changes of office shape local governments' procurement allocations and firms' cross-city investments?

## Motivation

China's regionally decentralized authoritarian system combines centralized personnel control with local economic authority. Promotion incentives can encourage growth, but relative performance evaluation also makes a rival jurisdiction's economic gains politically costly. The paper examines whether this conflict helps explain barriers to exchange between cities within the same province and whether firms internalize local officials' career concerns.

## Contributions

- Develops a project-selection tournament in which promotion incentives and positive regional spillovers jointly produce inefficient discrimination against competing cities.
- Derives predictions for relative political strength, affinity between officials, career concerns, and the opposite signs of two interaction effects.
- Tests these predictions using linked procurement, firm registration, firm financial reports, mayoral biographies, and city economic data.
- Examines home-city allocations, winning-firm characteristics, ownership differences, and cross-province comparisons to assess the local-protectionism interpretation.

## Method

### Tournament Model

Two mayors each select a unit mass of projects from their own city and a competing city. Projects have identical immediate benefits to the procuring city but heterogeneous long-run quality. Choosing a rival city's project additionally creates a positive short-run spillover for that rival. Mayor $i$ selects a cross-city share $x_i$, while promotion performance is $y_i=1+\tau x_j+a_i+\epsilon_i$, where $a_i$ is prior strength and $\tau>0$ is the spillover.

The mayor weights promotion benefits by $\delta$ and long-run project quality $Q(x_i)$ by $1-\delta$. Winning yields $V$; the rival's promotion yields $\alpha V$, capturing affinity. Under the symmetry, noise, and concavity conditions of Assumption 1, Proposition 1 gives

$$
x_1^*=x_2^*=(Q')^{-1}\left((1-\alpha)V\tau\frac{\delta}{1-\delta}g(\Delta_a)\right)<\frac12,
\qquad \Delta_a=|a_1-a_2|.
$$

Here $g$ is the symmetric, unimodal density of the difference in performance shocks. With identical project-quality distributions, the quality-maximizing cross-city share is one-half. Distortion disappears without spillovers or promotion incentives. Cross-city selection is lowest when prior strengths coincide, rises with affinity, and falls with the weight on promotion. The strength-gap interactions with affinity and promotion weight have opposite signs, although the model does not fix their individual signs (Proposition 2).

Firms can be interpreted as decision makers whose payoffs combine their own returns and the local politician's utility. Giving the politician weight $\lambda$ produces an effective promotion weight $\lambda\delta$. Appendix B extends the analysis to unequal project-quality distributions and access to a noncompeting city under additional assumptions.

### Data and Estimation

Procurement records cover more than 3.8 million contracts from 2013-2019. Firm registration and annual reports provide locations, ownership, equity investments, and financial characteristics. The political dataset covers 1,695 mayors and 5,660 city-year observations during 2003-2019; city yearbooks provide economic controls. Regression samples vary with outcomes and specifications.

The authors estimate mayoral promotion probabilities using logit models fitted separately for 2003-2012 and 2013-2019. Predictors include personal characteristics, age and tenure quadratics, political connections, GDP per capita, within-province GDP-growth ranking, and city and year fixed effects. The absolute gap between two predicted probabilities proxies their relative strength: a smaller gap means more intense competition.

The main city-pair regressions use $\log(1+\text{contract count})$ or $\log(1+\text{investment volume})$ as outcomes. They progressively add both mayors' predicted probabilities, population and GDP controls, city-pair and year fixed effects, and the relevant mayor's fixed effect (Equation 7). The authors motivate identification through changes in officials and argue that rotation is plausibly exogenous after controls. Baseline tables report standard errors from a province-year cluster bootstrap; Table 11 instead specifies city-level clustering.

Additional analyses measure shared factional backgrounds, common central/provincial work experience, and shared personal connections to provincial leaders. A change-of-office variable runs from -5 to 0, so an increase means moving closer to departure. Firm-quality regressions use registered capital, assets, and profits as proxies and adjust for contract characteristics, with procuring-city-by-year fixed effects in additional specifications.

## Experiments

The evidence consists of observational panel regressions and theoretical results, not randomized experiments. Selected estimates below follow the supplied tables. A 0.1 increase in the strength gap corresponds to *less* intense competition.

| Analysis | Reported estimate | Interpretation |
| --- | --- | --- |
| Cross-city procurement, Table 4, column 4 | Gap coefficient 0.386, SE 0.0791, p < 0.01; N = 27,228 | A 0.1 larger gap is associated with 0.0386 higher log(1 + contract count) |
| Cross-city investment, Table 7, column 4 | 0.485, SE 0.200, p < 0.05; N = 62,274 | A 0.1 larger gap is associated with 0.0485 higher log(1 + investment) |
| Investment by ownership, Table 8 | Local SOEs: 1.611, p < 0.01; central SOEs: 0.136, nonsignificant; private firms: 0.306, p < 0.10 | The largest estimate is for local SOEs; the central-SOE result does not establish an effect |
| Procurement format, Table 5 | Non-public formats: 0.466, p < 0.01; public auctions: 0.188, p < 0.05 | The estimated association is larger where governments have greater allocation discretion |
| Home-city allocations, Table 9, columns 2 and 4 | Minimum gap to any same-province competitor: -1.553 for procurement, p < 0.05; -1.810 for investment, p < 0.01 | Closer competition with the nearest rival is associated with more resources staying at home |
| Shared faction, Table 12 | Procurement: 0.115, p < 0.01; investment: 0.0828, p < 0.10 | Shared factional backgrounds are associated with more bilateral allocation |
| Approaching change of office, Table 13, columns 2 and 4 | Departure-proximity coefficient: -0.0459 for procurement, p < 0.01; -0.0286 for investment, p < 0.05 | Allocations decline as the procuring/investing city's mayor approaches departure |

These are coefficients on logarithms of one plus the outcome. For a change $d$ in a regressor, the fitted change is $\beta d$ log points, or $100[\exp(\beta d)-1]$ percent in one plus the outcome. It is not an exact percentage change in the untransformed count or investment volume.

Table 6 associates a smaller strength gap with higher registered capital, assets, and profits among winning firms from rival cities. With procuring-city-by-year fixed effects, the gap coefficients are -0.0371, -0.0472, and -0.0796, respectively; the asset result is significant only at 10%. These proxies support a higher selection threshold for outsiders but do not directly measure project quality or welfare.

Adjacent cities within the same province show positive gap coefficients, while those across provincial borders have negative, nonsignificant estimates (Table 10). The broader cross-province tests also report no significant gap effects (Table 11). These comparisons are consistent with a within-province promotion mechanism, without proving the absence of cross-province protectionism through other channels.

The interaction results have the predicted opposing signs (Table 14). Gap-by-faction coefficients are positive and significant at 5% for both outcomes; gap-by-departure-proximity coefficients are negative, significant at 5% for procurement and 10% for investment. Evidence for other ties is weaker: shared-work moderation is nonsignificant for procurement, and shared connections to provincial leaders do not significantly moderate either outcome. Shared work experience also has nonsignificant level associations in Table 12.

The text reports further checks using procurement value, procurement shares, alternative tenure specifications, and other robustness analyses in an online appendix. Those tables are not included in the supplied Markdown.

## Limitations

- Official rotation and predicted promotion probabilities are not randomized. Pair and mayor fixed effects absorb time-invariant differences, but appointments, local economic shocks, and departure timing may still share time-varying determinants with procurement and investment.
- Promotion probabilities, factional ties, and time to departure are proxies for latent competitive strength, affinity, and career concerns. The analysis does not directly observe these preferences or firms' internalization of them.
- Higher capital, assets, or profit among winning outsiders is indirect evidence of selection. It does not quantify contract performance, rejected alternatives, or aggregate efficiency losses. The authors explicitly leave structural welfare quantification for future work.
- The baseline model has two competitors and identical quality distributions; extensions retain additional equilibrium assumptions. The empirical evidence principally concerns Chinese mayors and within-province exchange in the sample period.
- Some prose and table descriptions conflict. For example, the Table 5 ownership ordering differs across the text, and the Table 9 prose blurs increasing competition with increasing the strength gap. The summary follows table labels and coefficient signs. Several table captions also label both outcome panels as procurement despite the investment panel headers.
- Data are available on request, and the referenced online empirical appendix is absent from this source. The supplied text contains damaged mathematical symbols and incomplete footnotes, limiting inspection of some implementation details.

The DOI is supplied in Appendix C. Publication year is not explicitly stated in the supplied Markdown and is left unspecified rather than inferred from the DOI.

## Related Concepts

- [[concepts/promotion-tournaments|Promotion Tournaments]]: relative performance incentives can reward withholding benefits from a close competitor.
- [[concepts/local-protectionism|Local Protectionism]]: the paper links barriers to inter-city exchange with home-city favoritism and differential selection thresholds.

## Related Papers

The source cites the following foundations; they do not currently have separate library pages:

- Lazear and Rosen (1981), "Rank-order tournaments as optimum labor contracts": the tournament framework underlying the model.
- Li and Zhou (2005), "Political turnover and economic performance: the incentive role of personnel control in China": promotion incentives and economic performance.
- Xu (2011), "The fundamental institutions of China's reforms and development": the institutional account of regionally decentralized authoritarianism.
- Shi, Xi, Zhang, and Zhang (2021), "Moving umbrella: bureaucratic transfers and the comovement of interregional investments in China": a cited study of political transfers and investment links.

[[papers/trustworthy-ai-in-public-administration-the-pro-trust-pipeline-for-ethical-fraud-detection-in-public-procurement|Trustworthy AI in public administration: The PRO-Trust pipeline for ethical fraud detection in public procurement]] is a thematic library connection on procurement oversight. It studies auditing safeguards rather than promotion incentives and is not a citation claimed by this paper.

[[index|Library home]]
