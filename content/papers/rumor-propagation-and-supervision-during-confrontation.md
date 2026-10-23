---
title: "Rumor Propagation and Supervision during Confrontation: An Importance-Driven SIRQS Network Model"
type: paper
authors:
  - Wenjie Zhang
  - Juan Wu
  - Minyu Feng
  - Qin Li
  - Matjaž Perc
year: null
source_job_id: "4792d8f8-7d26-4760-869d-d68c86a0f330"
tags:
  - misinformation
  - rumor-spreading
  - complex-networks
  - random-walks
  - resource-allocation
---

## TL;DR

The paper couples an SIRQS rumor process with mobile supervisors on a network. A vigilant state lowers susceptibility, spreaders favor targets farther from supervisors, and supervisors use importance-weighted random walks to seek spreaders or vulnerable ignorant nodes. Simulations report topology-dependent supervision coverage and diminishing returns from adding supervisors, but the Caltech Facebook experiment uses a real graph only; propagation and intervention remain simulated.

## Research Question

How do strategic rumor evasion, state-dependent mobile supervision, network topology, and the number of supervisors jointly determine rumor containment in a heterogeneous network?

## Motivation

Many [[concepts/misinformation-spreading-models|Misinformation Spreading Models]] study diffusion or intervention while holding the other side fixed. This paper instead represents spreaders and supervisors as mutually responsive processes: rumor transmission changes with proximity to supervision, while supervisor movement changes with local spreading risk. The formulation is intended to expose tradeoffs between prevention, intervention, coverage, and supervisory cost.

## Contributions

- Extends a recurrent SIRS-style process with a vigilant state whose susceptibility is reduced relative to an ignorant node.
- Introduces a confrontation factor that makes transmission to a node depend on its average hop distance from mobile supervisors.
- Defines supervisor movement as a random walk weighted by target state, local spreading importance, and a preference between preventing infection and pursuing current spreaders.
- Couples node-state and supervisor-location dynamics through a microscopic Markov chain approximation and derives a model-specific spreading threshold.
- Evaluates containment, coverage, cost-effectiveness, and marginal benefit on synthetic BA, WS, and ER networks and on the Caltech Facebook graph.

## Method

Each node is in one of four states: ignorant (`S`), spreader (`I`), vigilant (`Q`), or stifler (`R`). Ignorant nodes acquire the rumor at baseline rate $\beta$, vigilant nodes at the reduced rate $\theta\beta$, spreaders become stiflers with probability $\mu$, stiflers become vigilant with probability $\gamma_2$, and vigilant nodes return to ignorance with probability $\gamma_1$. A supervisor visiting an ignorant node converts it to vigilant; visiting a spreader converts it to stifler.

For node $i$, the mean hop distance to the $N_r$ supervisors is

$$
\bar d_{i\to r}(t)=\frac{1}{N_r}\sum_{n=1}^{N_r}d_{i\to r_n(t)}.
$$

The confrontation multiplier is $\hat c_i(t)=\min\{\xi/(1+e^{-\bar d_{i\to r}(t)}),1\}$, giving effective transmission rates $\beta_i^S(t)=\hat c_i(t)\beta$ and $\beta_i^Q(t)=\hat c_i(t)\theta\beta$. Thus, under the model, nodes farther from supervisors can be more attractive transmission targets as confrontation intensity $\xi$ increases.

Supervisors move only toward neighboring `S` or `I` nodes. The movement score for an `I` target is based on its probability of transmitting to adjacent `S` and `Q` nodes; the score for an `S` target is based on its probability of receiving the rumor from adjacent spreaders. A preference parameter $w_p$ trades pursuit of current spreaders against preventive patrol. The paper combines these movement probabilities with node-level state probabilities in a discrete-time microscopic Markov chain approximation.

## Experiments

The synthetic experiments use Barabasi-Albert, Watts-Strogatz, and Erdos-Renyi graphs at several network sizes and vary transmission, state-transition, confrontation, patrol-preference, and supervisor-count parameters. Higher transmission produces earlier and larger spreader peaks, while more supervisors lower spreader density and increase the vigilant population in the reported simulations. Greater preference for `I` nodes makes supervisor visits to spreaders more frequent and consistent, but topology remains important: the authors report the widest patrol coverage on WS networks and the narrowest on BA networks, where hubs repeatedly attract supervisors.

Higher confrontation intensity shifts spreaders toward distance bands farther from supervisors, especially on BA networks. For the supervisor-allocation study, Table II reports complete control in the tested synthetic settings with 20, 30, and 30 supervisors for $N=400$ at $\beta=0.2,0.4,0.6$, and with 60, 60, and 80 supervisors for $N=1000$. The same table selects 10 supervisors as the cost-effectiveness optimum in all six settings. These optima are conditional on the paper's simulation design and metrics.

On the Caltech Facebook network, all spreading and supervision outcomes are simulated. With 50 supervisors, increasing $\beta$ from 0.12 to 0.25 and 0.6 raises and prolongs spreader prevalence. At $\beta=0.2$, increasing the supervisor count from 0 to 60 and 120 progressively reduces spreaders and increases vigilant and stifler states, although the reported trajectories retain some residual spreaders.

## Limitations

- The framework assumes a closed, weighted, undirected network and omits population turnover. Adaptive or temporal topology, heterogeneous supervisor capability, cognitive heterogeneity, and multilayer structure are left for future work.
- The experiments simulate model dynamics on synthetic graphs and one empirical graph. They do not validate state transitions, evasion behavior, supervisor movement, or predictive accuracy against observed rumor and moderation traces.
- The confrontation rule uses network distance as a proxy for awareness of supervision, and the patrol rule assumes supervisors observe the states and local spreading importance needed to choose their next move.
- Reported allocation optima depend on the tested parameter grid, network sizes, stopping criterion, and definitions of control efficiency and cost-effectiveness; they are not general staffing prescriptions.
- The supplied Markdown contains damaged notation and an internal inconsistency: Table II reports control efficiency `1.0000` for the $N=1000$, $\beta=0.6$, 80-supervisor setting, while the accompanying prose calls 80 supervisors only partially effective. This page retains the table value but does not resolve the conflict.
- No publication year, venue, DOI, or arXiv identifier is established in the supplied text, so the year is left null.

## Related Concepts

- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]: compartmental and network representations of rumor diffusion and intervention.
- [[concepts/social-network-analysis|Social Network Analysis]]: topology and node neighborhoods shape patrol coverage and transmission opportunities.
- [[concepts/activity-driven-networks|Activity-Driven Networks]]: an alternative framework in which contacts change over time rather than supervisors moving on a fixed graph.

## Related Papers

These are thematic links to existing library pages, not claims that the supplied paper cites every page.

- [[papers/how-the-hesitation-mechanism-suppresses-misinformation-spreading-on-time-varying-networks|How the Hesitation Mechanism Suppresses Misinformation Spreading on Time-Varying Networks]]: models reduced susceptibility through hesitation on changing networks, without mobile supervisors.
- [[papers/structure-aware-optimal-intervention-for-rumor-dynamics-on-networks|Structure-aware optimal intervention for rumor dynamics on networks]]: allocates continuous node-level intervention over time rather than moving discrete supervisory agents.
- [[papers/rumor-propagation-on-hypergraphs|Rumor propagation on hypergraphs]]: replaces pairwise contacts with group-dependent spreading and stifling.
- [[papers/modeling-of-rumor-propagation-in-large-populations-with-network-via-graphon-games|Modeling of Rumor Propagation in Large Populations with Network via Graphon Games]]: represents strategic individual communication in a large-population network game.

[[index|Library home]]
