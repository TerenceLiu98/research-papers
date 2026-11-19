---
title: Polarization in social media
type: paper
authors:
  - Congli Zhang
  - Xiaolei Wang
  - Yong Min
  - Shanqing Yu
  - Ye Wu
  - Qi Xuan
  - Chenbo Fu
year: 2025
doi: 10.1016/j.physa.2025.130487
tags:
  - political-polarization
  - social-networks
  - random-walks
---

## TL;DR

Zhang and colleagues measure how many steps a random walk through a network of commenters takes to encounter every political leaning. Walks took longer than a shuffled baseline in the sampled Bilibili and YouTube discussions. In Reddit's News and Politics samples, the median normalized coverage time was negative.

## Research Question

How separated are commenters with different political leanings when two users are connected each time they comment on the same post?

## Motivation

Two discussions can have the same proportions of left-, center-, and right-leaning users but differ in who comments alongside whom. A walk that starts inside a cluster of like-minded users may take many steps to reach a discussion involving another group. Its length captures a feature of segregation that counts of users in each group miss.

## Contributions

The authors adapt a random-walk measure of ethnic segregation to online discussion networks. They compare eight platform-topic networks against shuffled baselines and check the measure in a simulation where the degree of partisan mixing can be varied.

## Method

Users who leave top-level comments on the same post are connected by an undirected edge, weighted by how often they comment on the same posts. The analysis uses the largest connected component of each network.

For videos, the authors code the stance of the title and infer whether a comment supports or opposes it using TextBlob for English and SnowNLP for Chinese. Each user's most frequent inferred leaning supplies their label for that topic. On Reddit, the label comes from the most frequent political orientation of news outlets linked in the user's submissions.

From each user, the authors run 1,000 walks on the weighted network and average the steps needed to visit all three leanings. They report the network mean, the coefficient of variation across starting users, and the mean absolute difference between neighboring users' coverage times. The null model shuffles both user leanings and edge weights on the same graph.

## Experiments

| Comparison | Reported finding |
| --- | --- |
| Climate change, feminism, and abortion videos collected over 2016–2023 | All six Bilibili and YouTube networks showed longer coverage times than the shuffled baseline. Both the results and conclusion report stronger separation on Bilibili for climate change and abortion. For feminism, the Figure 4 discussion ranks Bilibili higher on median normalized coverage time, while the conclusion ranks YouTube higher on polarization. |
| Reddit News and Politics | Both networks had negative median normalized coverage times. The authors found no evidence of excess separation by this measure in either subreddit. |
| Comment volume (Table 4) | Topics with more comments per video had shorter mean coverage times ($r=-0.973$, $p=0.027$). The authors caution that the correlation rests on a small sample. |
| Two-source simulation | With 200 users and 800 ties, perfectly anticorrelated news signals produced a network with political assortativity of 0.34 and positive normalized coverage time. Perfectly correlated signals produced assortativity of 0.0. |

## Limitations

Reddit differs from the video samples in both subject matter and how users receive political labels. The platform comparisons therefore combine differences in discussion structure, sampling, and measurement. Shared commenting records participation in the same thread. It gives no direct observation of which comments a user read or how their views changed. The study does not track the evolution of polarization or identify a causal effect of recommendations.

## Related Concepts

- [[concepts/class-coverage-time|Class Coverage Time]] gives the stopping rule for the walks.
- [[concepts/political-polarization|Political Polarization]] includes segregation in discussion networks, the dimension measured here.
- [[concepts/echo-chambers|Echo Chambers]] motivate the question of whether users encounter like-minded peers. The co-comment network measures the opportunity for such encounters.

## Related Papers

- Sousa and Nicosia (2022), “Quantifying ethnic segregation in cities through random walks,” provides the spatial segregation method that Zhang and colleagues adapt.
- [[papers/evaluating-echo-chambers-rabbit-holes-and-radicalization-pathways-on-youtube|Evaluating Echo Chambers, Rabbit Holes, and Radicalization Pathways on YouTube]] measures the recommendations shown to real accounts, a complementary observation to this paper's shared-commenting ties.
