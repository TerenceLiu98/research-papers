---
title: "Interest Groups and Intra-Party Conflict on Scored Votes"
type: paper
authors:
  - Laurel Harbridge-Yong
  - Warren Snead
year: null
accepted: "2025-04-24"
source_job_id: "3a3e8daa-1ce5-4483-a861-1a20c459f118"
tags:
  - legislative-politics
  - interest-groups
  - political-parties
  - roll-call-voting
---

## TL;DR

Across votes scored by fourteen party-aligned interest groups in the US House and Senate during 2007-2018, disagreement with aligned party leaders is uncommon but associated with substantially lower party voting cohesion. Disagreement is more frequent for majority-aligned groups overall, a pattern driven by Republican-aligned groups. Floor debates provide suggestive evidence that leaders' incentives to pass legislation can conflict with groups' commitments to policy positions; the study does not identify a causal effect of scoring on defections.

## Research Question

How often do interest groups score votes against their aligned party leadership, does disagreement vary with majority status, and is it associated with greater intra-party voting conflict?

## Motivation

Interparty polarization and shared policy commitments do not eliminate disagreements within party coalitions. Leaders and interest groups both pursue policy and electoral goals, but may resolve tensions between incremental legislative success and ideological position taking differently. Scorecards make these competing demands visible to legislators and potentially consequential for endorsements, donations, mobilization, and primary challenges.

## Contributions

- Uses [[concepts/interest-group-scorecards|Interest Group Scorecards]] to observe conflict between organized interests and aligned party leaders on specific roll calls.
- Separates majority/minority status from Democratic/Republican differences, showing that the aggregate majority pattern is not shared equally by both coalitions.
- Connects disagreement to party voting cohesion through observational models, committee-stage robustness checks, and qualitative floor-debate comparisons.

## Method

The dataset joins PIPC roll calls for the 110th-115th Congresses with interest-group scorecards and Voteview leadership voting records. Seven Republican-aligned groups are included: American Conservative Union, Club for Growth, Chamber of Commerce, National Federation of Independent Business, Family Research Council, Federation for American Immigration Reform, and FreedomWorks. Seven Democratic-aligned groups are included: American Association of University Women, Americans for Democratic Action, AFL-CIO, Alliance for Retired Americans, League of Conservation Voters, NAACP, and National Education Association.

A party's leadership position is the common yea/nay vote of its floor leader and whip in the relevant chamber. The Speaker is excluded for symmetry and because Speakers often abstain. Votes with internally divided leadership are excluded. For each party and roll call, the authors count aligned groups scoring in agreement or disagreement with leadership. The principal disagreement measure indicates whether at least one aligned group disagrees; cohesion is the percentage of party members voting with leadership.

Separate majority and minority models use either all votes scored by aligned groups or the subset scored by groups from both coalitions. Firth bias-reduced logistic regressions model disagreement; OLS models estimate its association with cohesion. Controls cover vote type, chamber, divided control of Congress, sponsor ideological extremity, bill importance, and issue area. Issue indicators are omitted from the restricted logistic models because of perfect separation. Robustness checks add CQ coverage or earlier House committee voting cohesion, available through the 114th Congress.

## Experiments

The evidence consists of observational analyses and selected qualitative comparisons.

| Analysis | Reported result | Interpretation |
| --- | --- | --- |
| Descriptive disagreement, Table 1 | At least one group disagrees on 14% of majority observations (N=1,251) versus 9% of minority observations (N=1,430); difference p<0.001 | Agreement predominates, with greater disagreement on the majority side |
| Votes scored by both coalitions, Table 1 | Disagreement rates are 9% versus 6% (N=573 and 591); difference p=0.07 | The comparison weakens when vote coverage is made more comparable |
| Cohesion, Table 3 models 3.1 and 3.3 | Disagreement coefficients are -26.1 percentage points for the majority (SE 1.08; N=1,133) and -12.7 for the minority (SE 1.31; N=1,307); both p<0.001 | Large conditional associations with defections from leadership |
| Cohesion on votes scored by both coalitions, models 3.2 and 3.4 | Coefficients are -27.5 and -12.8 points; both p<0.001 | The negative association persists in the restricted samples |
| Party-specific analyses, Section 3.3 | Disagreement-cohesion coefficients are -15.8 points for Democrats and -19.8 for Republicans; both p<0.001 | Both parties exhibit the association despite different disagreement frequencies |
| Floor-debate comparisons, Section 3.4 | Governing-versus-position-taking rhetoric appears in 8/16 disagreement cases (50%) and 1/11 agreement cases (9%) | Selected cases support the proposed tension without estimating its population prevalence |

Republican-aligned groups drive the higher disagreement frequency in the majority. Democratic-aligned groups disagree at similar rates, or marginally more often in the minority. Constrained passage votes and divided congressional control are associated with more disagreement in both majority and minority models, although significance varies across specifications.

The authors report that adding earlier committee cohesion leaves an approximately 20-point negative association in each party-status category. This check is restricted to House legislation with committee records and cannot account fully for subsequent bill changes. CQ controls and individual-group indicators also yield broadly similar results, with noisier estimates for infrequently dissenting groups. The supplied text describes these appendix results but does not include the appendices.

## Limitations

- Observed disagreement and defections may share causes, including bill content and factional divisions. Neither regression adjustment nor committee controls isolate the causal influence of a scoring announcement.
- The fourteen prominent groups were selected for partisan balance, influence, issue coverage, and available scorecards. They skew toward membership associations and do not represent all organized interests or forms of position taking.
- Analyses condition on scored votes and unified leadership. Excluding leadership splits may omit conflicts that interest groups helped generate; majority and minority samples also differ in vote coverage.
- The 2007-2018 period includes the Tea Party's rise. The Republican-driven majority pattern should not be treated as universal across parties or periods.
- Governing incentives are inferred from behavior and selected rhetoric, rather than measured as actors' underlying preferences. The qualitative sample contains only 27 cases.
- The supplied source gives an acceptance date but no explicit publication year, journal metadata, or article DOI. Publication year is therefore left unset; the replication DOI below identifies the dataset, not the article.

## Related Concepts

- [[concepts/interest-group-scorecards|Interest Group Scorecards]]: strategic selection of votes and public evaluation of legislators.
- [[concepts/interest-group-representation|Interest Group Representation]]: organized policy demands can diverge from aligned party leaders' choices.
- [[concepts/conditional-party-government|Conditional Party Government]]: shared preferences underpin delegation to leaders; this study examines conflicts within otherwise polarized coalitions.
- [[concepts/minority-party-capacity|Minority Party Capacity]]: minority incentives to legislate vary with circumstances, complicating a simple governing-majority versus obstructing-minority distinction.

## Related Papers

- [[papers/minority-party-capacity-in-congress|Minority Party Capacity in Congress]]: cited by the authors for minority legislative incentives; studies bargaining opportunities, cohesion, and motivation.
- [[papers/power-to-the-parties-cohesion-and-competition-in-the-european-parliament-1979-2001|Power to the Parties: Cohesion and Competition in the European Parliament, 1979-2001]]: related library comparison of party cohesion in another institutional setting, not a citation in this source.
- Charnock (2018), "More Than a Score: Interest Group Ratings and Polarized Politics": cited background on scorecards as instruments for advancing ideological commitments.
- Gelman (2017), "Rewarding Dysfunction: Interest Groups and Intended Legislative Failure": cited background on interest-group support for position taking even when enactment is unlikely.

Replication data identified in the source: [Harvard Dataverse](https://doi.org/10.7910/DVN/PAVD00).

[[index|Library home]]
