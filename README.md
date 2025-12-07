# 🧠 Pero – Chat with AI Replicas of Great Minds

<div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747650666/Screenshot_2025-05-19_3.59.22_PM_ikxs82.png" alt="Pero Demo" width="80%" />
  <p><strong>Experience immersive, intelligent conversations with the legends of the world.</strong></p>
</div>

## 📚 Table of Contents

- [🌟 Inspiration](#-inspiration)
- [🛠️ What Pero Does](#-what-pero-does)
- [🎯 Key Features](#-key-features)
- [💡 Tech Stack](#-tech-stack)
- [🚀 Future Roadmap](#-future-roadmap)
- [🙋‍♂️ Meet the Creator](#-meet-the-creator)
- [⚙️ Setup](#-setup)

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

## 🌟 Inspiration

We’re living in a world where our online presence, creativity, and communication are becoming just as important as what we do offline. But one person can’t be everywhere — replying to messages, sharing insights, or staying active across multiple platforms all the time.  

That’s where the idea of **replicas** came in.  

Instead of building yet another chat app, I wanted to create something more personal —  
a platform where anyone could **create an AI replica of themselves or others**, train it with real data, and then **plug it into different platforms or workflows**.  

A **replica** that can:  
- Reply on your behalf on social media 💬  
- Represent your voice or ideas automatically 🗣️  
- Help manage your online communication intelligently ⚙️  
- Or simply preserve the personality and style of legendary figures for learning and inspiration 📚  


## 🚀 What It Does

**Pero** is a powerful AI Replica platform that allows you to **create, train, and integrate replicas** — digital versions of real personalities or even yourself — that can interact intelligently across different platforms and use cases. 🤖✨  

Whether you want to:  
- Automate replies on social media 💬  
- Maintain your brand’s voice consistently 🧠  
- Build a personal assistant that communicates like you ⚙️  
- Or recreate legendary figures for education, storytelling, or inspiration 🎓  

**Pero** makes it possible — all in one place.  

You can design your replica’s personality, feed it with data that defines its knowledge and tone, and then **plug it into any platform** using webhooks or APIs.  

From chatting to automation, from personal to professional —  
**Pero** bridges the gap between who you are and how your digital presence interacts. 🚀  

## ✨ How It Works & Key Features

1. **Sign up & Log in**  
   - New users register or sign in with Google.  
   - Once logged in, you land on the Discover page.
     
  <div align="center">
    <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747810723/Screenshot_2025-05-21_122635_msnhai.png" alt="Pero Demo" width="80%" />
  </div>
  
2. **Discover & Chat**
   - Browse a gallery of already-trained replicas (Einstein, Gates, Kalam, Ronaldo, and more).  
   - Click any card to start a chat — each card even shows total chats so far.
     
  <div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747655007/Screenshot_2025-05-19_5.08.46_PM_swr1p9.png" alt="Pero Demo" width="80%" />
</div>

  <div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747655116/Screenshot_2025-05-19_5.14.44_PM_nd88gp.png" alt="Pero Demo" width="80%" />
</div>

3. **Create Your Own Replica**  
   - On the Create page, enter a name, description, and avatar.  
   - Your replica is private to you and trained only on the content you provide.
  
  <div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747654636/Screenshot_2025-05-19_5.05.57_PM_k7bbzi.png" alt="Pero Demo" width="80%" />
</div>

4. **Request a Public Replica**  
   - If your favorite personality isn’t listed, submit a request with basic details.  
   - The admin team will research books, interviews, and biographies, then craft an authentic public replica.  
   - Track your request status (“Not Started,” “In Progress,” “Completed,” or “Rejected”).
     
  <div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747811284/Screenshot_2025-05-21_123749_wpyjak.png" alt="Pero Demo" width="80%" />
</div>

5. **Admin Panel & Public Replicas**  
   - Admins review user requests and create public replicas using detailed prompts + public data.  
   - Once published, these replicas appear for everyone to chat with.

6. **Train Your Replicas**  
   - Click **Train** in the navbar to see all your replicas.  
   - Select any replica and upload new text (notes, articles, transcripts, etc.).  
   - Retrain as often as you like to keep the replica’s knowledge fresh.
     
  <div align="center">
  <img src="https://res.cloudinary.com/dvyl9zjkp/image/upload/v1747811012/Screenshot_2025-05-21_123309_jezsoe.png" alt="Pero Demo" width="80%" />
</div>

### Two Prompt Modes

- **Admin-Created (Public) Prompt**  
  Uses extensive public data (biographies, interviews, quotes) to simulate iconic figures in their true voice. 🎭

- **User-Created (Private) Prompt**  
  Relies solely on user-provided content (stories, memories, notes) for a personalized assistant or memory-keeper. 🗃️💬

---

#### Notes

- **Chat is live now**, but the final vision is full voice mimicry—replicas that sound exactly like the real person.  
- **Video simulation** is on the roadmap, pending performance testing.  
- A **subscription model** is planned for future releases but isn’t implemented yet.

You can explore the Create page code here to see the exact implementation:  
[Create Component Code](https://github.com/ANKITy102/Pero/blob/main/src/components/create/index.tsx) 🔗  

To see how the **Sensay API** is used via server actions, visit:  
[Sensay API Integration (Actions Folder)](https://github.com/ANKITy102/Pero/tree/main/src/lib/actions) ⚙️



## 🧪 Tech Stack

Pero is built using modern and scalable technologies to ensure a smooth, fast, and secure experience:

- **Next.js** – React framework for a performant and SEO-friendly frontend.
- **MongoDB** – For flexible, scalable storage of users, replicas, and chat data.
- **ShadCN & TailwindCSS** – For a clean, responsive, and minimal UI.
- **Sensay Wisdom Engine API** – The brain behind every replica. Handles prompt-based character simulation and chat continuity.
- **Zod, Axios, Zustand, React Hook Form** – For type-safe, reactive, and smooth form handling and API calls.
- **Vercel** – Seamless deployment with CI/CD and preview environments.


## 🔮 Future Roadmap

Here’s what’s coming next as **Pero** evolves:

- 🎙️ **Voice-based Conversations**  
  The biggest game-changer! Imagine actually *talking* to your favorite legends, not just typing. With detailed personality data and training, these replicas will mimic their real voices, tones, and speech patterns — making every conversation feel alive and authentic. This is the most important feature we’re building next because it takes connection to a whole new level.

  Plus, voice chat opens up amazing possibilities for accessibility and immersion.

- 🧠 **Deeper Memory & Context Awareness**  
  Your replicas will get smarter — remembering past conversations, learning from your unique style, and offering more natural, meaningful interactions.

- 📝 **Advanced Training Tools for Private Replicas**  
  More power to you! Soon, users will be able to customize tone, highlight key info, and prioritize training content — making private replicas truly personal assistants.

- 🎭 **Replica Marketplace & Discovery**  
  Find trending replicas, submit your own creations, and explore an ever-growing library of legends across every field.

- 📲 **Mobile App (Android & iOS)**  
  Take Pero with you everywhere. Learn, reflect, and chat on the go with a smooth, native mobile experience.

- 💎 **Subscription & Monetization**  
  To keep Pero growing and delivering premium features like voice conversations and priority access, we’ll introduce subscription plans. Subscribers will enjoy enhanced interactions, early access to new replicas, and exclusive training tools.


## 👨‍💻 Meet the Creator

Hi, I’m Ankit 👋 — the solo developer behind **Pero**.

From 💡 brainstorming and 🎨 design to 🧑‍💻 full-stack development, this platform is built from scratch by me with love and vision. I’m a Computer Science undergrad with a passion for 🌐 web development and a deep fascination for the minds of legends.

I’ve loved watching 🎙️ interviews, listening to 📻 podcasts, and reading 📚 about great personalities — but I wanted more than passive consumption.

So, I built **Pero** — a platform that lets us not just learn from the greats, but 💬 talk to them, ❓ question them, and be mentored by their wisdom 🧠.

Thank you for checking it out — and I hope **Pero** adds value to your growth journey 🚀.


## ⚙️ Setup

Getting started with **Pero** is super easy! Just follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/ANKITy102/Pero.git
   cd pero
   npm install
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
3. Create a `.env` file
   Copy the `.env.sample` file provided in the repo and fill in your environment variables.
4. Run the development server
   ```bash
   npm run dev
   ```
Open [http://localhost:3000](http://localhost:3000) in your browser to see Pero in action.

---

## 🧠💬🌟

**Pero – Because wisdom deserves to live on, speak back, and grow with you.**  
