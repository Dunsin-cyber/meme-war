# **MemeWar: Token-Based Meme War Platform**

MemeWar is a decentralized platform that gamifies meme battles using token economics. Users can create meme wars, challenge others, and engage in a competitive marketplace to buy tokens, vote for memes, and win rewards. The platform integrates supply-based linear token pricing and airdrop mechanics, creating an exciting and fair ecosystem.

---

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [Smart Contract Details](#smart-contract-details)
5. [Usage Workflow](#usage-workflow)
6. [Deployment](#deployment)
7. [Testing Scenarios](#testing-scenarios)
8. [Future Improvements](#future-improvements)

---

## **Overview**

MemeWar leverages blockchain technology to:
- **Create Meme Wars**: Participants upload their memes (linked via URI).
- **Buy Tokens**: Users purchase tokens in BNB with dynamically calculated prices based on total token sales.
- **Compete and Wager**: Participants support their meme by purchasing tokens for their team. The first meme to achieve the sale target wins.
- **Airdrop Rewards**: Locked tokens are airdropped proportionally to participants from the losing meme’s token pool.

---

## **Features**

### **Core Features**
1. **Tokenized Meme Wars**:
   - Token contracts dynamically created for each meme war.
   - Half the tokens are locked and reserved for rewards.

2. **Linear Supply-Based Token Pricing**:
   - Token price starts at `0.01 BNB` and increases linearly (`0.0001 BNB` per token sold).

3. **Airdrop Mechanics**:
   - Locked tokens from the losing meme pool are distributed proportionally to participants based on their token contributions.

4. **Non-Token Meme Wars**:
   - Create meme battles based on social media engagement metrics like likes or retweets.

5. **Transparent On-Chain Voting**:
   - All actions and token purchases are recorded on-chain for transparency and security.

---

## **Technical Architecture**

### **Contracts**
1. **MemeWar.sol**:
   - Handles the creation of meme wars.
   - Dynamically deploys ERC-20 tokens for tokenized meme wars.
   - Resolves meme wars by determining winners and initiating the airdrop.

2. **MemeWarToken.sol**:
   - Custom ERC-20 implementation for dynamically created tokens.
   - Implements the `buyTokens` function for purchasing tokens with BNB.
   - Tracks participants and manages locked tokens.

---

## **Smart Contract Details**

### **MemeWar.sol**
- **`createMemeWar`**:
   Creates a new meme war. If tokenized, deploys a custom ERC-20 token contract.

- **`resolveMemeWar`**:
   Resolves the war based on either token sales or social media metrics and distributes rewards.

- **`getAllWars`**:
   Retrieves all active meme wars.

- **`getClosedWars`**:
   Retrieves resolved meme wars.

---

### **MemeWarToken.sol**
- **`buyTokens`**:
   Enables users to buy tokens using BNB. Token price increases linearly with sales.

- **`airdropLockedTokens`**:
   Distributes locked tokens from the creator’s wallet proportionally to participants based on token purchases.

- **`calculatePrice`**:
   Dynamically calculates token price based on the total number of tokens sold.

---

## **Usage Workflow**

### **Step 1: Create Meme War**
- Users create a meme war via the `createMemeWar` function.
- Two memes are submitted with unique URIs (e.g., Twitter post links).
- For tokenized meme wars:
  - A new ERC-20 token contract is deployed.
  - Half of the tokens are locked for rewards.

### **Step 2: Participate in Meme War**
- Participants buy tokens (`buyTokens`) to support their favorite meme.
- Token prices dynamically adjust based on the number of tokens sold.

### **Step 3: Resolve Meme War**
- The war ends when the sale target or engagement metric (likes/retweets) is reached.
- The winning meme is declared, and the losing meme’s locked tokens are distributed to participants.

### **Step 4: Airdrop Locked Tokens**
- Locked tokens are airdropped to participants based on their contributions (`airdropLockedTokens`).

---

## **Deployment**

### **Contracts**
1. Deploy **MemeWarToken** contract for tokenized meme wars.
2. Deploy **MemeWar** contract for managing meme wars.

### **Tools**
- **Hardhat**: Used for compiling, testing, and deploying contracts.
- **OpenZeppelin**: Library for secure and modular smart contract development.

---

## **Testing Scenarios**

### **Functional Tests**
1. **Token Purchase**:
   - User buys tokens with exact BNB payment.
   - Verify token balance updates correctly.

2. **Airdrop Execution**:
   - Participants receive locked tokens proportionally.

3. **Resolve Meme War**:
   - Winner is declared based on sale target or engagement metric.

### **Edge Cases**
1. **Incorrect Payment**:
   - Revert if `msg.value` does not match token cost.

2. **Insufficient Tokens**:
   - Revert if requested tokens exceed available supply.

3. **Airdrop with Zero Purchases**:
   - Revert if no tokens were sold.

---

## **Future Improvements**

1. **Multi-Chain Support**:
   - Expand beyond Binance Smart Chain (BSC) to other EVM-compatible chains.

2. **Integration with Social Media APIs**:
   - Automate engagement metric tracking (e.g., retweets or likes).

3. **DAO Governance**:
   - Allow community members to vote on meme wars and platform improvements.

4. **Analytics Dashboard**:
   - Real-time tracking of token sales, meme performance, and airdrop distribution.

---

## **Key Takeaways**

MemeWar combines the excitement of meme battles with the transparency and fairness of blockchain technology. By introducing token-based competition, linear pricing, and automated airdrops, MemeWar is a step forward in gamified decentralized applications.

---

### **Contributors**
- **[Your Team Name/Member Names]**

For inquiries or collaboration, feel free to reach out at **[Your Contact Information]**.
