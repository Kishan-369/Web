import * as THREE from 'three';

/**
 * Generates authentic, sleek dark-mode Canvas textures for:
 * 0: Instagram UI
 * 1: YouTube UI
 * 2: Facebook UI
 * 3: WhatsApp UI
 *
 * Each canvas is rendered at 512x1024 with a frosted blur overlay
 * so the app UI is unmistakably recognized in the background
 * while the foreground 3D holographic icon pops with maximum clarity.
 */

// Helper to draw rounded rectangle on canvas context
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Common phone status bar (Clock 9:41, Signal, Wifi, Battery)
function drawStatusBar(ctx: CanvasRenderingContext2D, textColor = '#ffffff') {
  ctx.save();
  ctx.fillStyle = textColor;
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('9:41', 46, 38);

  // Signal bars
  ctx.fillStyle = textColor;
  for (let i = 0; i < 4; i++) {
    const barH = 5 + i * 3.5;
    ctx.fillRect(408 + i * 6, 38 - barH, 4, barH);
  }

  // Wifi icon arc
  ctx.beginPath();
  ctx.arc(444, 32, 8, Math.PI * 1.2, Math.PI * 1.8);
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // Battery pill
  drawRoundedRect(ctx, 462, 24, 28, 14, 4);
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  ctx.fillStyle = textColor;
  drawRoundedRect(ctx, 464, 26, 18, 10, 2);
  ctx.fill();
  ctx.fillRect(491, 28, 2, 6);
  ctx.restore();
}

// ---------------------------------------------------------------------------
// 0. INSTAGRAM UI TEXTURE
// ---------------------------------------------------------------------------
function createInstagramCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 1024);

  drawStatusBar(ctx);

  // App Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'italic bold 32px Georgia, "Times New Roman", serif';
  ctx.fillText('Instagram', 32, 95);

  // Header Icons (Heart & Messenger)
  // Heart
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(398, 74, 24, 24);
  // Red notification dot on heart
  ctx.fillStyle = '#ff3040';
  ctx.beginPath();
  ctx.arc(422, 74, 5, 0, Math.PI * 2);
  ctx.fill();

  // Messenger / DM icon
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(460, 86, 12, 0, Math.PI * 2);
  ctx.stroke();

  // Stories Tray (y: 120 - 240)
  const stories = [
    { name: 'Your story', isUser: true },
    { name: 'priya_v', color: '#f59e0b' },
    { name: 'rohit_k', color: '#ec4899' },
    { name: 'delhi_eats', color: '#8b5cf6' },
    { name: 'travel_ind', color: '#06b6d4' },
  ];

  stories.forEach((story, idx) => {
    const cx = 56 + idx * 98;
    const cy = 170;

    if (story.isUser) {
      // User story circle with grey rim & blue plus
      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      // Plus badge
      ctx.fillStyle = '#0095f6';
      ctx.beginPath();
      ctx.arc(cx + 22, cy + 22, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('+', cx + 18, cy + 27);
    } else {
      // Instagram gradient ring
      const grad = ctx.createLinearGradient(cx - 36, cy - 36, cx + 36, cy + 36);
      grad.addColorStop(0, '#f9ce34');
      grad.addColorStop(0.5, '#ee2a7b');
      grad.addColorStop(1, '#6228d7');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 35, 0, Math.PI * 2);
      ctx.stroke();

      // Inner avatar placeholder
      ctx.fillStyle = story.color || '#333333';
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Story username text
    ctx.fillStyle = '#cccccc';
    ctx.font = '12px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(story.name, cx, cy + 54);
  });
  ctx.textAlign = 'left';

  // Divider
  ctx.strokeStyle = '#1a1a1a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 248);
  ctx.lineTo(512, 248);
  ctx.stroke();

  // Post Header (y: 255 - 310)
  // Avatar
  const postGrad = ctx.createLinearGradient(20, 260, 60, 300);
  postGrad.addColorStop(0, '#ec4899');
  postGrad.addColorStop(1, '#f59e0b');
  ctx.strokeStyle = postGrad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(46, 282, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.arc(46, 282, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px -apple-system, sans-serif';
  ctx.fillText('ananya_verma', 78, 278);

  ctx.fillStyle = '#888888';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText('Goa, India • Original audio', 78, 296);

  // Three dots menu
  ctx.fillStyle = '#888888';
  ctx.beginPath();
  ctx.arc(470, 282, 3, 0, Math.PI * 2);
  ctx.arc(478, 282, 3, 0, Math.PI * 2);
  ctx.arc(486, 282, 3, 0, Math.PI * 2);
  ctx.fill();

  // Post Image / Reel Container (y: 318 - 720)
  const imgGrad = ctx.createLinearGradient(0, 318, 512, 720);
  imgGrad.addColorStop(0, '#311028');
  imgGrad.addColorStop(0.35, '#831843');
  imgGrad.addColorStop(0.7, '#be185d');
  imgGrad.addColorStop(1, '#db2777');
  ctx.fillStyle = imgGrad;
  ctx.fillRect(0, 318, 512, 402);

  // Photo visual elements (Sunset landscape / silhouette)
  ctx.fillStyle = 'rgba(255, 230, 200, 0.35)';
  ctx.beginPath();
  ctx.arc(256, 450, 70, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.beginPath();
  ctx.moveTo(0, 680);
  ctx.lineTo(150, 580);
  ctx.lineTo(280, 640);
  ctx.lineTo(410, 550);
  ctx.lineTo(512, 660);
  ctx.lineTo(512, 720);
  ctx.lineTo(0, 720);
  ctx.closePath();
  ctx.fill();

  // Carousel indicator dots
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = i === 0 ? '#0095f6' : '#555555';
    ctx.beginPath();
    ctx.arc(244 + i * 12, 705, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Post Action Row (y: 730 - 780)
  // Heart (Red filled like)
  ctx.fillStyle = '#ff3040';
  ctx.beginPath();
  ctx.arc(42, 746, 12, 0, Math.PI * 2);
  ctx.fill();

  // Comment bubble
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(88, 746, 11, 0, Math.PI * 2);
  ctx.stroke();

  // Share plane
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(126, 736);
  ctx.lineTo(146, 746);
  ctx.lineTo(132, 756);
  ctx.closePath();
  ctx.stroke();

  // Bookmark ribbon
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(462, 736, 18, 22);

  // Likes & Caption
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText('Liked by rahul_sharma and 48,291 others', 28, 792);

  ctx.fillStyle = '#ffffff';
  ctx.font = '14px -apple-system, sans-serif';
  ctx.fillText('ananya_verma Golden hour waves in South Goa ✨🌊', 28, 816);

  ctx.fillStyle = '#888888';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText('View all 412 comments', 28, 840);
  ctx.fillText('2 HOURS AGO', 28, 860);

  // Bottom Navigation Bar (y: 935 - 1024)
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 935, 512, 89);
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 935);
  ctx.lineTo(512, 935);
  ctx.stroke();

  // 5 Nav Icons: Home, Search, Reels, Shop, Profile
  const navX = [52, 154, 256, 358, 460];
  // Home (filled)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(navX[0] - 10, 958, 20, 20);
  // Search
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(navX[1], 968, 10, 0, Math.PI * 2);
  ctx.stroke();
  // Reels (play box)
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(navX[2] - 12, 958, 24, 20);
  // Heart
  ctx.strokeStyle = '#ffffff';
  ctx.strokeRect(navX[3] - 10, 958, 20, 20);
  // Profile circle
  ctx.fillStyle = '#ec4899';
  ctx.beginPath();
  ctx.arc(navX[4], 968, 12, 0, Math.PI * 2);
  ctx.fill();

  // Subtle frosted blur overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.42)';
  ctx.fillRect(0, 0, 512, 1024);

  return canvas;
}

// ---------------------------------------------------------------------------
// 1. YOUTUBE UI TEXTURE
// ---------------------------------------------------------------------------
function createYouTubeCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark YouTube background
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, 512, 1024);

  drawStatusBar(ctx);

  // App Header (y: 50 - 110)
  // Red YouTube play badge
  drawRoundedRect(ctx, 32, 68, 36, 26, 7);
  ctx.fillStyle = '#ff0000';
  ctx.fill();
  // White play triangle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(46, 74);
  ctx.lineTo(58, 81);
  ctx.lineTo(46, 88);
  ctx.closePath();
  ctx.fill();

  // "YouTube" text
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px -apple-system, sans-serif';
  ctx.fillText('YouTube', 76, 88);

  // Header action buttons (Cast, Bell, Search, Profile)
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  // Cast icon
  ctx.strokeRect(330, 72, 22, 18);
  // Bell with red dot
  ctx.strokeRect(380, 72, 20, 20);
  ctx.fillStyle = '#ff0000';
  ctx.beginPath();
  ctx.arc(400, 72, 6, 0, Math.PI * 2);
  ctx.fill();
  // Search
  ctx.beginPath();
  ctx.arc(436, 82, 8, 0, Math.PI * 2);
  ctx.stroke();
  // Avatar
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(476, 82, 15, 0, Math.PI * 2);
  ctx.fill();

  // Category Filter Pills (y: 115 - 165)
  const pills = [
    { title: 'All', active: true },
    { title: 'Gaming', active: false },
    { title: 'Tech News', active: false },
    { title: 'Music', active: false },
    { title: 'Shorts', active: false },
  ];
  let curX = 32;
  pills.forEach((p) => {
    ctx.font = 'bold 14px -apple-system, sans-serif';
    const pillW = ctx.measureText(p.title).width + 30;
    drawRoundedRect(ctx, curX, 120, pillW, 36, 10);
    ctx.fillStyle = p.active ? '#ffffff' : '#272727';
    ctx.fill();
    ctx.fillStyle = p.active ? '#000000' : '#ffffff';
    ctx.fillText(p.title, curX + 15, 143);
    curX += pillW + 10;
  });

  // Hero Video Card (y: 175 - 550)
  // Large 16:9 Thumbnail
  const thumbGrad = ctx.createLinearGradient(0, 175, 512, 450);
  thumbGrad.addColorStop(0, '#1c1917');
  thumbGrad.addColorStop(0.5, '#7f1d1d');
  thumbGrad.addColorStop(1, '#991b1b');
  ctx.fillStyle = thumbGrad;
  ctx.fillRect(0, 175, 512, 280);

  // Play button overlay in center
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  ctx.beginPath();
  ctx.arc(256, 315, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(248, 300);
  ctx.lineTo(272, 315);
  ctx.lineTo(248, 330);
  ctx.closePath();
  ctx.fill();

  // Video duration badge
  drawRoundedRect(ctx, 436, 415, 58, 26, 6);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px -apple-system, sans-serif';
  ctx.fillText('14:32', 448, 433);

  // Red watch progress line at bottom of thumbnail
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(0, 452, 280, 4);
  ctx.fillStyle = '#333333';
  ctx.fillRect(280, 452, 232, 4);

  // Video Info row (y: 468 - 560)
  // Channel avatar
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(46, 502, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('TI', 38, 508);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 17px -apple-system, sans-serif';
  ctx.fillText('India’s Screen Revolution: 500 Million Users', 82, 492);
  ctx.fillText('Glued to Feeds Daily [Deep Dive Documentary]', 82, 514);

  // Meta
  ctx.fillStyle = '#aaaaaa';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText('Tech India Insights • 2.8M views • 1 day ago', 82, 538);

  // Divider
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 565);
  ctx.lineTo(512, 565);
  ctx.stroke();

  // YouTube Shorts Shelf (y: 580 - 920)
  ctx.fillStyle = '#ff0000';
  drawRoundedRect(ctx, 32, 582, 24, 24, 6);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 20px -apple-system, sans-serif';
  ctx.fillText('Shorts', 66, 601);

  // 2 Vertical Shorts Preview Cards
  const shortsCards = [
    { title: 'The algorithm decoded in 30 seconds 🤯', views: '1.4M views', bg: '#450a0a' },
    { title: 'Why 1.4B phones never sleep in India', views: '3.2M views', bg: '#581c87' },
  ];
  shortsCards.forEach((card, idx) => {
    const cardX = 32 + idx * 230;
    const cardY = 620;
    drawRoundedRect(ctx, cardX, cardY, 215, 300, 16);
    ctx.fillStyle = card.bg;
    ctx.fill();

    // Text on card
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px -apple-system, sans-serif';
    ctx.fillText(card.title, cardX + 16, cardY + 245, 185);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '13px -apple-system, sans-serif';
    ctx.fillText(card.views, cardX + 16, cardY + 280);
  });

  // Bottom Navigation Bar (y: 935 - 1024)
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 935, 512, 89);
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 935);
  ctx.lineTo(512, 935);
  ctx.stroke();

  // 5 Nav items
  const ytNavX = [52, 154, 256, 358, 460];
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(ytNavX[0] - 10, 955, 20, 20); // Home
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.strokeRect(ytNavX[1] - 10, 955, 20, 20); // Shorts
  // Create (+) in circle
  ctx.beginPath();
  ctx.arc(ytNavX[2], 965, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeRect(ytNavX[3] - 10, 955, 20, 20); // Subs
  // Profile
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(ytNavX[4], 965, 12, 0, Math.PI * 2);
  ctx.fill();

  // Subtle frosted blur overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.40)';
  ctx.fillRect(0, 0, 512, 1024);

  return canvas;
}

// ---------------------------------------------------------------------------
// 2. FACEBOOK UI TEXTURE
// ---------------------------------------------------------------------------
function createFacebookCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Dark Facebook background
  ctx.fillStyle = '#18191a';
  ctx.fillRect(0, 0, 512, 1024);

  drawStatusBar(ctx);

  // App Header (y: 50 - 110)
  ctx.fillStyle = '#1877f2';
  ctx.font = '900 32px -apple-system, sans-serif';
  ctx.fillText('facebook', 32, 92);

  // Action circles at right: Search & Messenger
  ctx.fillStyle = '#3a3b3c';
  ctx.beginPath();
  ctx.arc(414, 82, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(412, 80, 7, 0, Math.PI * 2);
  ctx.stroke();

  // Messenger circle with red badge
  ctx.fillStyle = '#3a3b3c';
  ctx.beginPath();
  ctx.arc(466, 82, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1877f2';
  ctx.beginPath();
  ctx.arc(466, 82, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e41e3f';
  ctx.beginPath();
  ctx.arc(482, 70, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText('3', 479, 74);

  // Top Tab Bar (y: 115 - 170)
  const fbTabs = [
    { active: true },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ];
  fbTabs.forEach((tab, i) => {
    const tx = 52 + i * 102;
    ctx.strokeStyle = tab.active ? '#1877f2' : '#888888';
    ctx.lineWidth = 2.2;
    ctx.strokeRect(tx - 12, 126, 24, 20);
    if (tab.active) {
      ctx.fillStyle = '#1877f2';
      ctx.fillRect(tx - 32, 162, 64, 3);
    }
  });

  // "What's on your mind?" Box (y: 175 - 250)
  ctx.fillStyle = '#242526';
  ctx.fillRect(0, 175, 512, 75);

  ctx.fillStyle = '#3b82f6';
  ctx.beginPath();
  ctx.arc(48, 212, 20, 0, Math.PI * 2);
  ctx.fill();

  drawRoundedRect(ctx, 84, 192, 340, 40, 20);
  ctx.strokeStyle = '#3a3b3c';
  ctx.stroke();
  ctx.fillStyle = '#888888';
  ctx.font = '15px -apple-system, sans-serif';
  ctx.fillText("What's on your mind?", 106, 217);

  ctx.fillStyle = '#45bd62';
  ctx.fillRect(444, 202, 22, 20);

  // Stories Carousel (y: 260 - 450)
  ctx.fillStyle = '#242526';
  ctx.fillRect(0, 260, 512, 190);

  const fbStories = [
    { title: 'Create story', user: true },
    { title: 'Vikram S.', color: '#1e3a8a' },
    { title: 'Pooja R.', color: '#065f46' },
  ];
  fbStories.forEach((st, i) => {
    const sx = 20 + i * 160;
    drawRoundedRect(ctx, sx, 275, 145, 160, 14);
    ctx.fillStyle = st.color || '#3a3b3c';
    ctx.fill();

    if (st.user) {
      ctx.fillStyle = '#1877f2';
      ctx.beginPath();
      ctx.arc(sx + 72, 385, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('+', sx + 66, 392);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px -apple-system, sans-serif';
    ctx.fillText(st.title, sx + 14, 420);
  });

  // News Feed Post (y: 460 - 920)
  ctx.fillStyle = '#242526';
  ctx.fillRect(0, 460, 512, 465);

  // Author
  ctx.fillStyle = '#1877f2';
  ctx.beginPath();
  ctx.arc(48, 495, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px -apple-system, sans-serif';
  ctx.fillText('Rohan Sharma', 80, 492);
  ctx.fillStyle = '#888888';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText('3 hrs • 🌐 Public', 80, 510);

  // Post caption
  ctx.fillStyle = '#e4e6eb';
  ctx.font = '15px -apple-system, sans-serif';
  ctx.fillText('Connecting 350M users across India with real-time', 32, 545);
  ctx.fillText('community stories and local network updates! 🇮🇳✨', 32, 568);

  // Media photo
  const fbMediaGrad = ctx.createLinearGradient(0, 590, 512, 820);
  fbMediaGrad.addColorStop(0, '#1e3a8a');
  fbMediaGrad.addColorStop(0.5, '#2563eb');
  fbMediaGrad.addColorStop(1, '#60a5fa');
  ctx.fillStyle = fbMediaGrad;
  ctx.fillRect(0, 590, 512, 230);

  // Reactions row
  ctx.fillStyle = '#1877f2';
  ctx.beginPath();
  ctx.arc(42, 842, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e41e3f';
  ctx.beginPath();
  ctx.arc(58, 842, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#888888';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText('1.8K', 76, 846);
  ctx.fillText('184 comments • 42 shares', 330, 846);

  // Action buttons (Like, Comment, Share)
  ctx.strokeStyle = '#3a3b3c';
  ctx.beginPath();
  ctx.moveTo(20, 860);
  ctx.lineTo(492, 860);
  ctx.stroke();

  ctx.fillStyle = '#1877f2';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText('👍 Like', 60, 892);
  ctx.fillStyle = '#b0b3b8';
  ctx.fillText('💬 Comment', 200, 892);
  ctx.fillText('↗ Share', 380, 892);

  // Bottom Navigation Bar (y: 935 - 1024)
  ctx.fillStyle = '#18191a';
  ctx.fillRect(0, 935, 512, 89);
  ctx.strokeStyle = '#2d2e30';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 935);
  ctx.lineTo(512, 935);
  ctx.stroke();

  // Subtle frosted blur overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.40)';
  ctx.fillRect(0, 0, 512, 1024);

  return canvas;
}

// ---------------------------------------------------------------------------
// 3. WHATSAPP UI TEXTURE
// ---------------------------------------------------------------------------
function createWhatsAppCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // WhatsApp Dark background
  ctx.fillStyle = '#121b22';
  ctx.fillRect(0, 0, 512, 1024);

  drawStatusBar(ctx);

  // App Header (y: 50 - 110)
  ctx.fillStyle = '#1f2c34';
  ctx.fillRect(0, 48, 512, 62);

  ctx.fillStyle = '#e9edef';
  ctx.font = 'bold 26px -apple-system, sans-serif';
  ctx.fillText('WhatsApp', 32, 90);

  // Camera, Search, More Options icons
  ctx.strokeStyle = '#aebac1';
  ctx.lineWidth = 2.2;
  // Camera
  ctx.strokeRect(360, 74, 22, 18);
  // Search
  ctx.beginPath();
  ctx.arc(424, 82, 8, 0, Math.PI * 2);
  ctx.stroke();
  // 3 vertical dots
  ctx.fillStyle = '#aebac1';
  ctx.beginPath();
  ctx.arc(472, 74, 2.5, 0, Math.PI * 2);
  ctx.arc(472, 82, 2.5, 0, Math.PI * 2);
  ctx.arc(472, 90, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Tab Navigation Bar (y: 110 - 165)
  ctx.fillStyle = '#1f2c34';
  ctx.fillRect(0, 110, 512, 55);

  ctx.fillStyle = '#00a884';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText('CHATS (8)', 110, 142);
  // Active emerald green indicator line
  ctx.fillRect(96, 160, 100, 4);

  ctx.fillStyle = '#8696a0';
  ctx.fillText('UPDATES', 260, 142);
  ctx.fillText('CALLS', 410, 142);

  // Chat Conversations List (y: 175 - 920)
  const chats = [
    {
      name: 'Family Group 🏠',
      msg: 'Dad: Photos shared from celebration!',
      time: '11:42 AM',
      unread: 4,
      color: '#10b981',
    },
    {
      name: 'Rahul Sharma',
      msg: '✓✓ Done! Sent the updated project report.',
      time: '10:15 AM',
      unread: 0,
      color: '#3b82f6',
    },
    {
      name: 'College Alumni 🎓',
      msg: 'Pooja: Let us plan the reunion in Goa!',
      time: 'Yesterday',
      unread: 12,
      color: '#f59e0b',
    },
    {
      name: 'Mom ❤️',
      msg: 'Voice message (0:24) ▶ ılıılı',
      time: 'Yesterday',
      unread: 0,
      color: '#ec4899',
    },
    {
      name: 'Tech Founders India',
      msg: 'Aman: Reaching 550M+ users milestone 🚀',
      time: 'Monday',
      unread: 2,
      color: '#8b5cf6',
    },
    {
      name: 'Vikram (Design)',
      msg: 'Check the new 3D elevation map preview.',
      time: 'Sunday',
      unread: 0,
      color: '#06b6d4',
    },
  ];

  chats.forEach((chat, idx) => {
    const cy = 210 + idx * 82;

    // Contact Avatar
    ctx.fillStyle = chat.color;
    ctx.beginPath();
    ctx.arc(58, cy, 26, 0, Math.PI * 2);
    ctx.fill();

    // Contact Name
    ctx.fillStyle = '#e9edef';
    ctx.font = 'bold 17px -apple-system, sans-serif';
    ctx.fillText(chat.name, 102, cy - 6);

    // Last message preview
    ctx.fillStyle = '#8696a0';
    ctx.font = '14px -apple-system, sans-serif';
    ctx.fillText(chat.msg, 102, cy + 18, 270);

    // Time
    ctx.fillStyle = chat.unread > 0 ? '#00a884' : '#8696a0';
    ctx.font = chat.unread > 0 ? 'bold 12px sans-serif' : '12px sans-serif';
    ctx.fillText(chat.time, 420, cy - 6);

    // Unread count badge
    if (chat.unread > 0) {
      drawRoundedRect(ctx, 450, cy + 4, 26, 22, 11);
      ctx.fillStyle = '#00a884';
      ctx.fill();
      ctx.fillStyle = '#111b21';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(String(chat.unread), 458, cy + 19);
    }

    // Row separator
    ctx.strokeStyle = '#202c33';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(102, cy + 40);
    ctx.lineTo(512, cy + 40);
    ctx.stroke();
  });

  // Floating Action Button (New Chat emerald green circle)
  ctx.fillStyle = '#00a884';
  ctx.beginPath();
  ctx.arc(445, 850, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(437, 842, 18, 16);

  // Bottom Navigation Bar (y: 935 - 1024)
  ctx.fillStyle = '#1f2c34';
  ctx.fillRect(0, 935, 512, 89);
  ctx.strokeStyle = '#2a3942';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 935);
  ctx.lineTo(512, 935);
  ctx.stroke();

  // Subtle frosted blur overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.40)';
  ctx.fillRect(0, 0, 512, 1024);

  return canvas;
}

// ---------------------------------------------------------------------------
// Exported textures generator
// ---------------------------------------------------------------------------
export function createAllAppScreenTextures(): THREE.CanvasTexture[] {
  const canvases = [
    createInstagramCanvas(), // Index 0: Instagram
    createYouTubeCanvas(),   // Index 1: YouTube
    createFacebookCanvas(),  // Index 2: Facebook
    createWhatsAppCanvas(),  // Index 3: WhatsApp
  ];

  return canvases.map((canvas) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  });
}
