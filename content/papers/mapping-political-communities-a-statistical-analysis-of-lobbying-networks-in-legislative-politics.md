---
title: "Mapping Political Communities: A Statistical Analysis of Lobbying Networks in Legislative Politics"
type: paper
authors:
  - In Song Kim
  - Dmitriy Kunisky
year: 2021
doi: "10.1017/pan.2020.29"
source_job_id: "269d5dd3-63db-49fe-9849-b8c44cafa73c"
tags:
  - legislative-networks
  - lobbying
  - community-detection
---

## TL;DR

Kim and Kunisky develop a bipartite link community model (biLCM) that permits both overlapping actor memberships and multiple community contributions to the same dyad's interaction count. Applied to bill-linked lobbying in the 113th U.S. Congress, it distinguishes specialist interests from broad participants and connects issue communities to congressional committee jurisdictions.

## Research Question

How can a network model recover overlapping political communities when two distinct actor types interact repeatedly across several issue domains?

## Motivation

Lobbying disclosures identify bills but do not identify individual congressional contacts. Linking lobbied bills to sponsors supplies an indirect measure of shared legislative involvement. A single community assignment obscures generalists, while a latent spatial location can conflate different combinations of interests.

## Contributions

- A probabilistic bipartite model with mixed memberships and additive community-specific interactions (Section 2).
- An EM estimator implemented in the R package polnet.
- A lobbying database linking interest groups and sponsors through bill references, and an application mapping issue communities, membership breadth, and anomalous dyads (Section 3).

## Method

Let $A_{ij}$ count bills lobbied by interest group $i$ and sponsored by legislator $j$. The model assumes independent counts with

$$
A_{ij}\sim\operatorname{Poisson}\left(\sum_{z=1}^k\kappa_z\alpha_{iz}\beta_{jz}\right),
\qquad \sum_i\alpha_{iz}=\sum_j\beta_{jz}=1.
$$

Nonnegative actor weights describe participation, while $\kappa_z$ controls total community activity. Each observed count sums independent latent Poisson counts across communities. Thus repeated interactions within one dyad can reflect several shared interests, rather than a single latent community choice for the entire dyad.

EM allocates counts fractionally using responsibilities proportional to $\kappa_z\alpha_{iz}\beta_{jz}$ and updates community activity and actor weights from those allocated counts. The application retains the highest-likelihood solution among 50 random starts; global optimality is not guaranteed.

For an interest group, normalized activity shares are $p_{iz}=\kappa_z\alpha_{iz}/\sum_r\kappa_r\alpha_{ir}$, with an analogous formula for legislators. Entropy $H_i=-\sum_z p_{iz}\log_2 p_{iz}$ summarizes breadth; $2^{H_i}$ is an effective number of communities.

## Experiments

The underlying database processes 1,111,859 reports filed during 1999–2017 and connects 20,092 interest groups to 1,164 current or former legislators. These are database-wide counts, not the size of the 113th-Congress estimation sample. Bill references are resolved by number or title and assigned to congressional sessions using textual signals.

The application fixes $k=8$. The inferred communities cover Healthcare, Veterans’ Affairs, Technology & Telecommunications, Energy, Finance & Insurance, Universities & Research, Civil Society, and Retail & Transportation. Microsoft and Arch Coal each place at least 85% of activity in their respective dominant communities. McAfee places 31% in Technology & Telecommunications and 52% in Universities & Research. Philips North America and the Chamber of Commerce each allocate no more than 25% to any single community (Section 3.2).

Specialized legislators tend to serve on committees with corresponding jurisdictions; high-entropy legislators tend to serve on broad power committees. Cross-domain lobbying is especially visible in Civil Society, although that community ranks only fourth in total activity. The data do not reveal whether groups lobbying the same bill support the same position.

Comparisons with a two-dimensional Poisson latent space model and a degree-corrected bipartite stochastic block model recover similar specialized clusters. The biLCM additionally describes broad actors and overlapping issue participation that a single location or exclusive block assignment obscures. This is a substantive comparison, not a reported held-out prediction benchmark.

Model-based anomaly inspection highlights, for example, Tom Marino–CVS with 10 observed interactions versus 0.55 expected, and Michael Enzi–eBay with 11 versus 1.08 (Table 1). Geographic ties, contributions, and salient legislation are proposed explanations, not causally identified mechanisms.

## Limitations

- Sponsor–lobbyist connections are indirect shared-bill associations, not observed meetings or evidence of influence. Lobbying direction is unobserved.
- Community number is chosen in advance; formal selection, covariates, and multipartite extensions are future work.
- Independence and Poisson assumptions constrain the representation of relational dependence. Multiple starts mitigate, but do not eliminate, local optimization issues.
- The supplied main article refers to supplementary derivations and diagnostics that are not included in this Markdown; their detailed results are not reconstructed here.

## Related Concepts

- [[concepts/bipartite-link-community-models|Bipartite Link Community Models]]: additive count decomposition with overlapping memberships on both sides of a network.
- [[concepts/social-network-analysis|Social Network Analysis]]: community structure provides a relational account of political activity.
- [[concepts/stochastic-block-models-with-covariates|Stochastic Block Models with Covariates]]: a neighboring model family; this paper's fitted biLCM does not incorporate covariates.

## Related Papers

- Ball, Karrer, and Newman (2011), “An Efficient and Principled Method for Detecting Communities in Networks”: the link-community modeling precedent adapted to bipartite data.
- Airoldi et al. (2008), “Mixed Membership Stochastic Blockmodels”: the mixed-membership baseline discussed in the paper; the comparison concerns its dyad-level community assignment formulation.
- Larremore, Clauset, and Jacobs (2014), “Efficiently Inferring Community Structure in Bipartite Networks”: the bipartite block-model comparator.

Published in *Political Analysis* 29, 317–336 (2021), online 23 November 2020. Replication identifiers supplied by the article: Dataverse `10.7910/DVN/CSAJQY` and Code Ocean `10.24433/CO.0776811.v1`.
