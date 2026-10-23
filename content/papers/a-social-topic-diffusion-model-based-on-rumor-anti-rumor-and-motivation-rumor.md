---
title: "A Social Topic Diffusion Model Based on Rumor, Anti-Rumor, and Motivation-Rumor"
type: paper
authors:
  - Xuemei Mou
  - Wei Xu
  - Yangfu Zhu
  - Qian Li
  - Yunpeng Xiao
year: 2023
doi: "10.1109/TCSS.2022.3179435"
journal: "IEEE Transactions on Computational Social Systems"
tags:
  - rumor-spreading
  - information-diffusion
  - graph-neural-networks
  - network-embedding
  - evolutionary-game-theory
  - retweet-prediction
---

## TL;DR

This paper predicts whether a potential user will next retweet a rumor, an official correction, a related motivation-rumor, or nothing. Its game-GCN pipeline combines Doc2vec content features, a Rumor2vec structural embedding, and evolutionary-game edge weights that treat anti-rumors as competitive with rumors and motivation-rumors as cooperative. Across four Weibo topics, the full model generally improves on an unweighted GCN and most baselines, but one topic favors the authors' earlier rumor/anti-rumor model.

## Research Question

Can next-period participation in an online rumor topic be predicted more accurately by jointly modeling the rumor, corrective anti-rumors, and related motivation-rumors, including their competitive and cooperative effects on the diffusion network?

## Motivation

Rumor-diffusion models often study one message or add only a corrective message. The authors argue that real topic spaces also contain related claims produced for particular purposes, which they call motivation-rumors. These messages may reinforce the original rumor, while official anti-rumors suppress it. A useful predictor must therefore represent user content, latent network structure, message interaction, and temporal changes in topic activity together.

## Contributions

- Defines a multimessage topic space containing rumor, anti-rumor, motivation-rumor, and nonparticipation outcomes.
- Introduces Rumor2vec, a Node2vec-style embedding whose walks incorporate user interaction weights and node activity.
- Uses an evolutionary game to turn the competing or cooperative influence of the three message types into signed edge weights for a mixed diffusion network.
- Combines content and structural representations with a two-layer graph convolutional network and weighted cross-entropy for four-class next-period retweet prediction.
- Evaluates both user-level prediction and time-sliced topic trajectories on Sina Weibo and Tencent Weibo topics.

## Method

At time `t`, the model joins observed retweeters with two-hop followers treated as potential participants. Each user receives two feature representations. TextRank first extracts keywords from historical posts, after which Doc2vec maps each user's content to a fixed-length interest vector. Rumor2vec maps network structure by adapting Node2vec walks: transition probabilities depend on retweet-based interaction strength, return and in/out parameters, and the activity of the current and previous users.

The model separately estimates the influence of rumor, anti-rumor, and motivation-rumor messages from message popularity and user activity. Pairwise evolutionary-game payoffs quantify a user's incentive to choose each message type given the composition of upstream neighbors. These incentives produce signed edge weights: anti-rumor influence is mapped to `(-1, 0]` and motivation-rumor influence to `[0, 1)`, encoding their assumed competitive and cooperative relationships with the rumor.

The resulting weighted adjacency matrix and concatenated content and structural features enter a two-layer GCN with ReLU, dropout, and softmax. A class-weighted cross-entropy objective addresses the imbalance among four labels: no retweet, rumor retweet, anti-rumor retweet, and motivation-rumor retweet. Applying the classifier across successive time slices yields a predicted topic-participation trajectory.

## Experiments

The evaluation uses three topics from a Sina Weibo dataset and one self-collected Tencent Weibo topic. The topics concern the Wenzhou train collision, Han Han plagiarism allegations, genetically modified rice experiments in Hengyang, and an end-of-the-world claim. Messages were manually labeled against official accounts as rumor, anti-rumor, or motivation-rumor. The reported topic spaces contain 1,792-3,862 rumor participants, 1,285-2,363 motivation-rumor participants, 1,136-2,374 anti-rumor participants, and 563,478-957,621 potential users. Data are split 8:1:1 for training, validation, and testing.

Rumor2vec is reported as slightly better than DeepWalk and Node2vec across macro-precision, macro-recall, and macro-F1 comparisons. The selected embedding dimension varies by topic: 128 for topics A and C and 64 for topic B. Doc2vec also outperforms Word2vec in the reported content-feature comparison.

The multimessage AM-Game topology outperforms an unweighted adjacency matrix and the single-message A-Game and M-Game variants on the three Sina Weibo topics. In the full baseline comparison, game-GCN obtains macro-F1 scores of 0.653, 0.701, 0.672, and 0.729 and micro-F1 scores of 0.770, 0.837, 0.813, and 0.773 on topics A-D. Its earlier rumor/anti-rumor predecessor, R-AR, performs better on topic A (macro-F1 0.726 and micro-F1 0.835), which the authors attribute to noisy motivation-rumor text and many inactive or automated followers. Other methods also lead individual cells: for example, ODW-ELM has higher macro-F1 on topics C and D and higher micro-F1 on topics C and D. The time-sliced plots qualitatively track participation trends for all four topics.

## Limitations

The evidence comes from four Chinese social-media topics, with only one topic from Tencent Weibo, so cross-platform and cross-topic generalization remains uncertain. Message categories were manually assigned using official information, but the paper does not report inter-annotator agreement. Several important relations are assumptions rather than independently validated mechanisms, particularly that anti-rumors compete with rumors, motivation-rumors cooperate with them, and pairwise game payoffs adequately summarize exposure effects.

Potential users are drawn from two follower layers, producing very large and imbalanced candidate sets that include inactive or automated accounts; the authors explicitly identify this as a problem for topic A. Hyperparameters and embedding dimensions are selected using the same small collection of topics, and the reported comparisons do not include uncertainty estimates or significance tests. The trajectory evaluation is graphical rather than a separately quantified forecasting benchmark. Finally, the full model does not dominate every baseline on every metric, despite the paper's broad concluding claim that it has the best prediction effect.

## Related Concepts

- [[concepts/misinformation-spreading-models|Misinformation Spreading Models]]
- [[concepts/rumor-refutation-on-social-media|Rumor Refutation on Social Media]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/coevolutionary-network-games|Coevolutionary Network Games]]
- Network representation learning
- Retweet prediction

## Related Papers

- Xiao, Yang, Sang, and Liu (2020), "Rumor Diffusion Model Based on Representation Learning and Anti-Rumor."
- [[papers/minimizing-rumor-influence-in-multiplex-online-social-networks-based-on-human-individual-and-social-behaviors|Minimizing Rumor Influence in Multiplex Online Social Networks Based on Human Individual and Social Behaviors]]
- Wan et al. (2021), "Intervening Coupling Diffusion of Competitive Information in Online Social Networks."
- Chen et al. (2019), "Information Diffusion Prediction via Recurrent Cascades Convolution."
- Grover and Leskovec (2016), "node2vec: Scalable Feature Learning for Networks."

[[index|Library home]]
