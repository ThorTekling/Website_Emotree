import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ArticleDetail.scss";

const articles = [
  {
    id: 1,
    title: "Mental Health Awareness",
    content: `Mental health is a vital aspect of our overall well-being, yet it is often misunderstood or neglected. Mental health awareness aims to break down the stigma surrounding mental illnesses, encouraging open conversations and understanding. Just as we prioritize physical health by eating well or exercising, we must also care for our mental and emotional well-being. Raising awareness helps create a society where individuals feel safe to share their struggles and seek help without fear of judgment.

Despite growing conversations around mental health, many people still suffer in silence. Common conditions such as anxiety, depression, and burnout can affect anyone—regardless of age, gender, or background. According to the World Health Organization, one in four people will be affected by a mental disorder at some point in their lives. This statistic alone highlights the urgent need for education, empathy, and support systems in schools, workplaces, and communities.

Mental health awareness campaigns and observances—such as World Mental Health Day—play a crucial role in shedding light on these issues. They educate the public, challenge myths, and promote resources for those in need. These initiatives remind us that mental health is just as important as physical health and that early intervention can prevent more serious problems later on.

In conclusion, mental health awareness is not a one-time event—it’s an ongoing effort to build a more empathetic, informed, and supportive society. Each of us has a role to play in this movement. Whether you’re checking in on a friend, advocating for better mental health resources, or simply being kinder to yourself, you are contributing to a healthier and more open world.`,
  },
  {
    id: 2,
    title: "Understanding Stress",
    content: `Stress is a natural part of life, arising from the demands we face at work, school, or home. While short-term stress can sometimes be motivating, chronic stress can negatively impact both mental and physical health. Prolonged exposure to stress hormones like cortisol can weaken the immune system, disrupt sleep, and contribute to anxiety or depression.

Understanding the root causes of stress is the first step to managing it effectively. These might include overwhelming workloads, interpersonal conflict, financial challenges, or health concerns. By identifying what triggers your stress, you can develop strategies to address or avoid these triggers when possible.

Healthy coping mechanisms include physical activity, which helps release endorphins and reduce tension, as well as practices like mindfulness, journaling, and deep breathing exercises. It's also important to build supportive relationships—talking to someone you trust can offer perspective and comfort during difficult times.

Stress is not something we can completely eliminate, but it is something we can learn to manage. With the right tools and mindset, stress can become a signal for growth rather than a barrier to well-being.`,
  },
  {
    id: 3,
    title: "Coping with Anxiety",
    content: `Anxiety is one of the most common mental health challenges today, affecting millions of people worldwide. It often manifests as persistent worry, restlessness, or fear about everyday situations. For some, anxiety is situational and temporary, while for others it becomes a chronic condition that interferes with daily life.

Recognizing anxiety symptoms early can help prevent escalation. Physical symptoms such as rapid heartbeat, muscle tension, and difficulty sleeping often accompany emotional stress. It’s essential to approach anxiety with compassion rather than judgment—both for ourselves and for others.

There are many effective ways to cope with anxiety. Mindfulness and meditation help center your thoughts and reduce the tendency to ruminate. Cognitive behavioral therapy (CBT) is another proven approach that helps individuals reframe negative thinking patterns. Engaging in regular physical activity and maintaining a consistent sleep schedule can also contribute to a more stable emotional state.

Above all, remember that you are not alone. Reaching out for professional support is a strength, not a weakness. With patience, support, and the right tools, it’s possible to live a fulfilling life while managing anxiety.`,
  },
  {
    id: 4,
    title: "Benefits of Journaling",
    content: `Journaling is a simple yet powerful practice that supports mental clarity, emotional regulation, and personal growth. By putting thoughts into words, we gain a deeper understanding of our experiences and emotions. Journaling acts as a mirror, reflecting our inner world and helping us process complex feelings.

One major benefit of journaling is emotional release. Writing about worries, fears, or frustrations helps unburden the mind. It creates space for calm and perspective. Regular journaling can also reveal patterns—such as triggers for stress or sources of joy—that we might overlook in the moment.

Beyond self-reflection, journaling is a tool for goal setting and gratitude. Keeping track of achievements and things you’re thankful for can boost motivation and positivity. Even a short daily entry can bring focus and grounding.

There is no "right" way to journal. Whether it's structured prompts or free writing, pen and paper or digital notes, what matters most is consistency. Make it your own, and let it become a safe, private space where your thoughts are always welcome.`,
  },
  {
    id: 5,
    title: "Meditation for Beginners",
    content: `Meditation is an ancient practice that continues to benefit modern minds. For beginners, meditation can seem intimidating—but in reality, it’s a simple practice of paying attention. You don’t need hours of quiet or years of training. Just a few minutes of mindful breathing can help you feel more grounded and centered.

Start by finding a comfortable place to sit or lie down. Close your eyes and focus on your breath. Inhale deeply, exhale slowly. If your mind wanders, gently bring it back to the breath without judgment. This awareness is the essence of meditation.

Over time, consistent meditation can reduce stress, improve concentration, and enhance emotional balance. It trains the mind to be more present, helping you respond to challenges with clarity rather than impulsiveness.

There are many resources to support your journey—apps, guided meditations, or even YouTube videos. The key is to start small and stay consistent. Even five minutes a day can make a noticeable difference. Let meditation be your daily reset button for peace and presence.`,
  },
  {
    id: 6,
    title: "The Power of Sleep",
    content: `Sleep is not just a passive activity—it’s a powerful process that restores the body and mind. During deep sleep, the brain processes emotions, stores memories, and clears out toxins. This makes good sleep essential for mental clarity, emotional stability, and overall well-being.

Unfortunately, many people underestimate the impact of poor sleep. Chronic sleep deprivation has been linked to mood disorders, cognitive decline, and weakened immune function. It also affects decision-making, creativity, and your ability to handle stress.

To improve sleep, focus on creating a healthy bedtime routine. Avoid screens at least an hour before bed, keep your sleep space cool and quiet, and go to bed at the same time every night. Relaxation techniques like reading, stretching, or meditative breathing can signal your body that it’s time to wind down.

Quality sleep isn’t a luxury—it’s a necessity. Prioritizing rest is one of the most effective ways to support your mental and emotional health. Make it part of your self-care strategy every day.`,
  },
  {
    id: 7,
    title: "Balancing Screen Time",
    content: `In today’s digital world, screens are everywhere—from smartphones and laptops to TVs and tablets. While technology brings convenience and connection, too much screen time can harm mental health. It can lead to eye strain, disrupted sleep, reduced focus, and even feelings of anxiety or loneliness.

One major concern is the addictive nature of social media. Constant scrolling can make us compare ourselves to others, feel inadequate, or lose hours of our day without realizing it. Being aware of your screen habits is the first step to change.

Set intentional limits for screen use. Take breaks throughout the day, especially during long work or study sessions. Consider screen-free times—like during meals or an hour before bed. Replace digital time with offline hobbies like reading, exercising, or spending time in nature.

Digital balance doesn’t mean cutting screens out completely—it means using them mindfully. By creating healthy boundaries, you reclaim your time, focus, and well-being.`,
  },
  {
    id: 8,
    title: "Mindful Eating",
    content: `What you eat doesn’t just affect your body—it influences your mood, energy, and mental health. Mindful eating is the practice of paying full attention to your meals, from how food tastes to how it makes you feel. It helps you slow down, appreciate nourishment, and tune into your body’s needs.

Unlike dieting, mindful eating isn’t about restriction—it’s about awareness. Are you eating because you’re hungry, bored, or stressed? Are you satisfied, or still reaching for more without thinking? Answering these questions helps build a healthier relationship with food.

Balanced nutrition supports brain function and emotional stability. Whole foods like fruits, vegetables, whole grains, and lean proteins provide the nutrients your brain needs to function optimally. Meanwhile, highly processed foods and excessive sugar can lead to energy crashes and mood swings.

Next time you eat, put away distractions, chew slowly, and savor each bite. You'll be surprised how much more connected—and satisfied—you feel.`,
  },
];


const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === parseInt(id));

  return (
    <div className="article-detail">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <div className="content">
            {article.content.split("\n\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
          <Link to="/articles" className="back-button">← Back to Articles</Link>
        </>
      ) : (
        <p>Article not found.</p>
      )}
    </div>
  );
};

export default ArticleDetail;