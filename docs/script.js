// DOM Elements
const langToggle = document.getElementById('langToggle');
const body = document.body;

// State Management
let currentLang = 'ja';

// GitHubリポジトリの設定（ここを変更してください）
const GITHUB_REPO = '9dpbQ/Stapler-mini';

let latestReleaseData = null;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    initializeAnimations();
    initializeAccordions();
    initializeVideoControls();
    initializeHeader();
    initializeSystemThemeListener();
    initializeAutoLanguageDetection();
    loadLatestRelease(); // リリース情報を読み込み
});

// Language Management
function initializeLanguage() {
    const savedLang = localStorage.getItem('language') || 'ja';
    currentLang = savedLang;
    
    if (savedLang === 'en') {
        switchLanguage('en');
        langToggle.checked = true;
    } else {
        langToggle.checked = false;
    }
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Hide all language elements
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show elements for current language
    document.querySelectorAll(`[data-lang="${lang}"]`).forEach(el => {
        el.classList.remove('hidden');
    });
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Save to localStorage
    localStorage.setItem('language', lang);
}

function toggleLanguage() {
    const newLang = currentLang === 'ja' ? 'en' : 'ja';
    switchLanguage(newLang);
}

// 自動言語検出機能
function initializeAutoLanguageDetection() {
    // ブラウザの言語設定を取得
    const browserLang = navigator.language || navigator.userLanguage;
    const savedLang = localStorage.getItem('language');
    
    // 初回訪問時のみ自動検出（保存された設定がない場合）
    if (!savedLang) {
        if (browserLang.startsWith('en')) {
            switchLanguage('en');
            langToggle.checked = true;
        } else {
            switchLanguage('ja');
            langToggle.checked = false;
        }
    }
    
    // トグルスイッチのイベントリスナー
    langToggle.addEventListener('change', function() {
        const newLang = this.checked ? 'en' : 'ja';
        switchLanguage(newLang);
    });
}

// システムのテーマ変更を監視
function initializeSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', function(e) {
        // システム設定の変更に自動追従
        const isDarkMode = e.matches;
        body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    });
    
    // 初期設定
    const isDarkMode = mediaQuery.matches;
    body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// Accordion Management
function initializeAccordions() {
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            const icon = this.querySelector('.accordion-icon');
            
            // Close other accordions
            accordionToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    const otherTargetId = otherToggle.getAttribute('data-target');
                    const otherContent = document.getElementById(otherTargetId);
                    const otherIcon = otherToggle.querySelector('.accordion-icon');
                    
                    otherToggle.classList.remove('active');
                    otherContent.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current accordion
            this.classList.toggle('active');
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(45deg)';
                // Smooth scroll to accordion if needed
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Animation Management
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger animation for feature cards
                if (entry.target.classList.contains('feature-card')) {
                    const cards = document.querySelectorAll('.feature-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Video Controls
function initializeVideoControls() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Add loading state
        video.addEventListener('loadstart', function() {
            this.parentElement.classList.add('loading');
        });
        
        video.addEventListener('loadeddata', function() {
            this.parentElement.classList.remove('loading');
        });
        
        // Add hover effects
        video.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        video.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Add click to play/pause (optional)
        video.addEventListener('click', function() {
            if (this.paused) {
                this.play();
            } else {
                this.pause();
            }
        });
        
        // Intersection Observer for video playback
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play();
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.5 });
        
        videoObserver.observe(video);
    });
}

// Header Management
function initializeHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        // 現在のテーマ状態を取得
        const currentThemeState = body.getAttribute('data-theme') || 'light';
        
        if (scrollY > 100) {
            header.style.background = currentThemeState === 'dark' 
                ? 'rgba(15, 23, 42, 0.98)' 
                : 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = currentThemeState === 'dark' 
                ? 'rgba(15, 23, 42, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Auto-hide header on scroll down (optional)
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    }
    
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
            setTimeout(() => { ticking = false; }, 10);
        }
    }
    
    window.addEventListener('scroll', onScroll);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Error Handling
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // You can add user-friendly error messages here
}

// Performance Optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            img.loading = 'lazy';
        }
        
        // Error handling
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/600x400/6366f1/ffffff?text=Image+Not+Found';
        });
    });
}

// Accessibility Improvements
function improveAccessibility() {
    // Add keyboard navigation for accordions
    document.querySelectorAll('.accordion-toggle').forEach(toggle => {
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Event Listeners
// トグルスイッチのイベントリスナーは initializeAutoLanguageDetection 内で設定済み

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    optimizeImages();
    improveAccessibility();
});

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Recalculate layouts if needed
    // This is useful for responsive adjustments
}, 250));

// Page visibility handler
document.addEventListener('visibilitychange', function() {
    const videos = document.querySelectorAll('video');
    
    if (document.hidden) {
        videos.forEach(video => video.pause());
    } else {
        videos.forEach(video => {
            if (video.getBoundingClientRect().top < window.innerHeight) {
                video.play();
            }
        });
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage
    };
}

// GitHubリリース関連の関数
async function loadLatestRelease() {
    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
        if (!response.ok) {
            throw new Error('リリース情報の取得に失敗しました');
        }
        
        latestReleaseData = await response.json();
        
        // バージョン情報を表示
        const versionElement = document.getElementById('versionInfo');
        if (versionElement) {
            versionElement.textContent = `v${latestReleaseData.tag_name}`;
        }
        
    } catch (error) {
        console.error('GitHub API エラー:', error);
        const versionElement = document.getElementById('versionInfo');
        if (versionElement) {
            versionElement.textContent = 'v?.?.?';
        }
    }
}

// 最新リリースをダウンロード
async function downloadLatestRelease() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!latestReleaseData) {
        // ローディング状態を表示
        downloadBtn.classList.add('loading');
        downloadBtn.disabled = true;
        
        try {
            await loadLatestRelease();
        } catch (error) {
            alert('リリース情報の取得に失敗しました。しばらく待ってからもう一度お試しください。');
            downloadBtn.classList.remove('loading');
            downloadBtn.disabled = false;
            return;
        }
        
        downloadBtn.classList.remove('loading');
        downloadBtn.disabled = false;
    }
    
    // zipファイルを探す
    const zipAsset = latestReleaseData.assets.find(asset => 
        asset.name.toLowerCase().endsWith('.zip')
    );
    
    if (zipAsset) {
        // 特定のzipファイルをダウンロード
        window.open(zipAsset.browser_download_url, '_blank');
        showDownloadNotification(zipAsset.name);
    } else {
        // zipファイルが見つからない場合はソースコードのzipをダウンロード
        window.open(latestReleaseData.zipball_url, '_blank');
        showDownloadNotification(`ソースコード（${latestReleaseData.tag_name}）`);
    }
}

// ダウンロード通知を表示
function showDownloadNotification(fileName) {
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>📥 ${fileName} のダウンロードが開始されました！</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // スタイルを適用
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒後に自動削除
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}