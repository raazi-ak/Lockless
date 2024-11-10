# Lockless
A Web3-based system that enables secure, keyless car access for valets. The system uses blockchain smart contracts to grant, manage, and revoke time-based access permissions. It includes a car emulator, a mobile app for car owners and valets, and blockchain backend integration.
---

### **Core Features:**

---

#### **1. Car Owner App**
- **Grant Access:**
  - Select valet from a list or enter their wallet address.
  - Specify access duration.
  - Confirm transaction using crypto wallet.
  
- **Revoke Access:**
  - Revoke valet access before expiry, if needed.

- **View Access History:**
  - Show past valet interactions, including timestamps and valet IDs.

---

#### **2. Valet App**
- **Access Notification:**
  - Receive notifications when access is granted.
  - Display expiration time for the access.

- **Unlock Car:**
  - Send a request to unlock the car within the access window.
  - Show car status (Locked/Unlocked).

- **Return Car:**
  - Notify the owner when parking is complete.
  - Relock the car automatically upon access expiry.

---

#### **3. Car Emulator (Vehicle System Simulation)**
- **Blockchain Integration:**
  - Verify access by querying the blockchain.
  - Listen for `AccessGranted` and `AccessRevoked` events.

- **Access Control:**
  - Lock or unlock the car based on the valet's access.
  - Automatically lock the car when access expires.

- **Status Display:**
  - Show car status (Locked/Unlocked).
  - Display valet wallet address and access expiry time.

---

#### **4. Smart Contract (Deployed on Blockchain)**
- **Grant Access:**
  - Function: `grantAccess(address _valet, uint256 _duration)`
  - Records valet address and expiration time.

- **Revoke Access:**
  - Function: `revokeAccess()`
  - Revokes current valet access immediately.

- **Access Query:**
  - Public function to check current access status (car unlocked/locked).

- **Events:**
  - `AccessGranted(address valet, uint256 expiryTime)`
  - `AccessRevoked(address valet)`

---

#### **5. Backend Services**
- **API Gateway:**
  - Relays access grant/revoke requests to the blockchain.
  
- **Push Notifications:**
  - Sends real-time updates to the valet app upon access grant or revoke.

- **Event Listener:**
  - Listens to blockchain events and updates the car emulator.

---

### **Development Phases**

---

#### **Phase 1: Smart Contract Development**
- Write and deploy a smart contract on a testnet.
- Functions:
  - `grantAccess`
  - `revokeAccess`
  - Query functions for valet status.
  
---

#### **Phase 2: Car Emulator Development**
- Build a car emulator to simulate lock/unlock.
- Features:
  - Blockchain listener.
  - Status display (Locked/Unlocked).
  
---

#### **Phase 3: Mobile Apps**
- **Owner App:**
  - Grant/revoke access.
  - Connect to wallet for transaction signing.
  
- **Valet App:**
  - Receive notifications.
  - Unlock/lock car based on access.
  
---

#### **Phase 4: Backend Services**
- Develop APIs to relay commands and listen for events.
- Integrate push notification services.

---

#### **Phase 5: Integration and Testing**
- Connect mobile apps, backend, and car emulator.
- Test smart contract interactions on the testnet.
- Simulate access control scenarios.

---

### **Technical Stack**

1. **Frontend**:
   - Flutter (for mobile apps).
   - React or Electron (for car emulator, if desktop).

2. **Backend**:
   - Node.js with Express (API services).
   - Web3.js/Ethers.js for blockchain integration.

3. **Blockchain**:
   - Ethereum or Polygon testnet.
   - Solidity for smart contracts.

4. **Database** :
   - Firebase Firestore or MongoDB for valet logs.

---

### **Features Checklist** 

#### **Car Owner App**:
- [ ] Grant Access
- [ ] Revoke Access
- [ ] View Access History

#### **Valet App**:
- [ ] Receive Notifications
- [ ] Unlock Car
- [ ] Return Car

#### **Car Emulator**:
- [ ] Connect to Blockchain
- [ ] Lock/Unlock Based on Permissions
- [ ] Display Status

#### **Smart Contract**:
- [ ] `grantAccess`
- [ ] `revokeAccess`
- [ ] Event Emitters (`AccessGranted`, `AccessRevoked`)

#### **Backend**:
- [ ] API Gateway
- [ ] Event Listener
- [ ] Push Notifications

