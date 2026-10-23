---
title: "Learning to Deliver: a Foundation Model for the Montreal Capacitated Vehicle Routing Problem"
type: paper
authors:
  - Samuel J. K. Chin
  - Matthias Winkenbach
  - Akash Srivastava
year: null
source_job_id: "ddf551e1-8e62-4883-b541-05c534ba61a1"
tags:
  - neural-combinatorial-optimization
  - vehicle-routing
  - transformers
  - supervised-learning
---

## TL;DR

FM-MCVRP recasts routing on a fixed city-scale graph as conditional sequence generation and trains a 206-million-parameter T5-style encoder-decoder on 38.1 million solutions produced by five-second runs of Hybrid Genetic Search. One unified model handles 20-400 customers and varying capacities, improves on its single-run HGS training targets for sufficiently large instances when many solutions are sampled, and transfers to 600- and 800-customer instances. It remains worse than stronger LKH-3 and repeated-HGS benchmarks, while autoregressive sampling becomes expensive at scale.

## Research Question

Can a supervised Transformer learn the distribution of heuristic solutions to the [[concepts/montreal-capacitated-vehicle-routing-problem|Montreal Capacitated Vehicle Routing Problem]], improve on those training solutions through sampling, and generalize across vehicle capacities and to larger problem sizes than it saw during training?

## Motivation

Classical CVRP methods can produce strong solutions but require specialized algorithms and substantial search time. Delivery operators may instead possess large archives of imperfect planned or executed routes. Because the Montreal variant repeatedly samples active addresses from one fixed road-network-like graph, node identities can form a stable vocabulary. The paper uses that structure to treat route construction as a language-modeling problem and amortize optimization across instances.

## Contributions

- Introduces FM-MCVRP, a supervised Transformer encoder-decoder that predicts route sequences over fixed node IDs rather than pointing to positions in each input instance.
- Trains one model across customer counts from 20 to 400 and sampled capacity ranges, instead of training a separate model for each size-capacity combination.
- Shows that nucleus sampling can produce routes better than the five-second HGS solutions used as labels, particularly on larger instances.
- Evaluates extrapolation to 600 and 800 customers and compares the model with HGS, LKH-3, and a retrained Attention Model.

## Method

### Fixed-Graph Sequence Model

Each problem is a subgraph of a fixed graph containing 10,000 possible customer nodes and one depot. The encoder receives the active nodes; the autoregressive decoder represents a solution as node IDs, with depot tokens separating routes. Both components share an output projection over all 10,001 IDs. A feasibility mask prevents selection of unavailable or infeasible nodes.

Each node has coordinates, demand, depot status, distance and angle relative to the depot, plus decoder-only features for current capacity utilization and cumulative fulfilled demand. The 12-layer encoder and 12-layer decoder use 768-dimensional embeddings and 12 attention heads, totaling 206 million parameters. Cross-entropy losses train the encoder to recover node identities and the decoder to reproduce HGS route tokens.

### Training and Decoding

The authors generate 100,000 instances for every customer count from 20 through 400, yielding 38.1 million problem-solution pairs. Each label comes from HGS with a five-second limit. Training first pretrains the encoder on truncated size-stratified data, then fine-tunes the encoder-decoder with a curriculum that introduces progressively larger instances. Random graph rotations augment the data.

At inference, greedy decoding selects the most likely feasible node. Nucleus sampling truncates and samples from the next-node distribution; multiple sampled routes, with random rotations, are generated and the shortest is retained. This improves quality but scales inference cost linearly with the number and length of samples.

## Experiments

The evaluation uses 1,000 instances at each size from 20 to 400 and 100 instances each at 600 and 800 customers. Comparators are HGS, LKH-3, and a separately trained Attention Model for each evaluated size. Results distinguish one, 100, and 1,000 model samples or heuristic runs.

- Against one five-second HGS run, 1,000-sample FM-MCVRP is 0.32%, 1.16%, and 1.05% better on average at 100, 200, and 400 customers, respectively. At 400 customers the mean objectives are 34.71 versus 35.08; the paired one-sided test reported in Appendix D rejects equality in favor of FM-MCVRP.
- Greedy FM-MCVRP is faster than five-second HGS through 200 customers but is 1.96% worse at 400 customers, taking 5.97 seconds on average.
- Against the best of 1,000 five-second HGS runs, 1,000-sample FM-MCVRP is 0.81% worse at 400 customers (34.71 versus 34.43), and decoding takes 63.14 minutes versus 2.12 minutes for the reported HGS runs.
- Although trained only through 400 customers, 100-sample FM-MCVRP beats a single five-second HGS run on mean objective at 600 and 800 customers. Matched against 100 or 1,000 HGS runs, however, it is 0.66%-0.80% worse and takes 14.52-273.53 minutes.
- LKH-3 remains stronger at every tested size and sample count. With 1,000 samples at 400 customers, FM-MCVRP is 2.02% worse. FM-MCVRP generally beats the learned Attention Model from 100 customers onward; that baseline's training diverges at 400 customers.
- Training exhibits a double-descent pattern. A route-permutation augmentation also fails: unordered route decoding can omit regions until a final oversized loop, whereas sorting routes by depot-relative angle improves behavior.

## Limitations

- The fixed vocabulary is specific to one synthetic, uniformly sampled graph. Evidence does not establish transfer to a new city, real road costs, time windows, heterogeneous fleets, or operational objectives beyond distance and capacity.
- Comparisons depend strongly on compute and sample count. The model improves weak labels only through costly multi-sample decoding and does not outperform LKH-3 or repeated HGS under the reported settings.
- Autoregressive decoding is sequential and cannot be parallelized across token positions; inference reaches hours per large instance at 1,000 samples.
- Training requires 38.1 million labeled instances, 16 V100 GPUs, and several multi-day phases. The paper does not compare total training and data-generation cost with the savings from later inference.
- The supplied manuscript reports no publication year or stable identifier. Some broad operational claims about learning driver preferences and iterative self-improvement are proposed applications, not tested results.

## Related Concepts

- [[concepts/montreal-capacitated-vehicle-routing-problem|Montreal Capacitated Vehicle Routing Problem]]: the fixed-graph routing setting that makes persistent node IDs available as tokens.
- [[concepts/neural-combinatorial-optimization|Neural Combinatorial Optimization]]: the broader family of learned construction and optimization methods.

## Related Papers

- Kool, van Hoof, and Welling (2019), "Attention, Learn to Solve Routing Problems!": the reinforcement-learning Attention Model used as the learned baseline.
- Vinyals, Fortunato, and Jaitly (2015), "Pointer Networks": establishes input-position pointing for variable-size combinatorial outputs.
- Vidal (2022), "Hybrid Genetic Search for the CVRP: Open-source Implementation and SWAP* Neighborhood": supplies the training-label generator and principal heuristic benchmark.
- Bengio, Lodi, and Prouvost (2021), "Machine Learning for Combinatorial Optimization: a Methodological Tour d'Horizon": formalizes the Montreal problem setting used here.

Source scope: supplied parsed manuscript. It provides neither a publication year nor a stable identifier.

[[index|Library home]]
