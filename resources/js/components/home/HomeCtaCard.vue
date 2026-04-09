<script setup>
// No props needed for static version.
// Add props later if you want dynamic title/text/url.
</script>

<template>
  <div class="moest-cta-wrapper">
    <div class="moest-cta-card">
      <!-- Soft blobs -->
      <div class="blob blob-top-right"></div>
      <div class="blob blob-bottom-left"></div>

      <!-- Content -->
      <div class="moest-content">
        <div class="badge">MoEST Career Guidance System</div>

        <h1 class="title">
          Your Career. <span class="gradient-text">Our Guidance.</span>
        </h1>

        <p class="description">
          Nepal's official career platform — gain clarity and discover the right path from education to employment, free for every student.
        </p>

        <a
          href="http://cgs.moest.gov.np/"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-button"
          @mouseenter="$event.currentTarget.style.transform='translateY(-2px)'; $event.currentTarget.style.filter='brightness(1.1)'"
          @mouseleave="$event.currentTarget.style.transform='translateY(0)'; $event.currentTarget.style.filter='brightness(1)'"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          </svg>
          Explore cgs.Moest.gov.np
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <!-- Bottom shimmer -->
      <div class="shimmer-bar"></div>
    </div>
  </div>
</template>

<style scoped>
/* Keyframe animations */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.35); }
  70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Component styles */
.moest-cta-wrapper {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
}

.moest-cta-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  height: 300px;
  background: #fff;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blob {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  pointer-events: none;
}

.blob-top-right {
  top: -80px;
  right: -60px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.07) 0%, transparent 70%);
}

.blob-bottom-left {
  bottom: -80px;
  left: -60px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(251, 146, 60, 0.06) 0%, transparent 70%);
}

.moest-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
  padding: 0 40px;
  animation: fade-up 0.5s ease both;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.title {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  color: #111827;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.gradient-text {
  background: linear-gradient(90deg, #dc2626, #f97316);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.65;
  max-width: 480px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 13px 30px;
  border-radius: 11px;
  text-decoration: none;
  animation: pulse-ring 2.5s ease-in-out infinite;
  transition: transform 0.2s, filter 0.2s;
  cursor: pointer;
}

.cta-button svg {
  stroke-width: 2.5;
}

.shimmer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #dc2626, #f97316, #dc2626, transparent);
  background-size: 200% 100%;
  animation: shimmer 2.5s linear infinite;
}
</style>
