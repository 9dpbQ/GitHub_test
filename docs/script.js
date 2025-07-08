// DOM Elements
const langToggle = document.getElementById('langToggle');
const body = document.body;

// State Management
let currentLang = 'ja';

// GitHubリポジトリの設定（ここを変更してください）
const GITHUB_REPO = '9dpbQ/Stapler-mini';

let latestReleaseData = null;

// 細かい使い方セクションのデータ（アコーディオンリスト対応）
const howtoDetailData = {
    macro: {
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        summary: 'マクロ機能で複雑な操作も簡単に。ここに概要説明が入ります。',
        accordions: [
            {
                title: 'マクロの作成方法',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
                text: 'ここにマクロの作成方法の説明が入ります。'
            },
            {
                title: '活用例',
                img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                text: 'ここにマクロの活用例の説明が入ります。'
            }
        ]
    },
    device: {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
        summary: 'デバイスごとに細かく設定可能。ここに概要説明が入ります。',
        accordions: [
            {
                title: 'デバイスプロファイル',
                img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
                text: 'ここにデバイスプロファイルの説明が入ります。'
            },
            {
                title: 'デバイスごとの設定例',
                img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
                text: 'ここにデバイスごとの設定例の説明が入ります。'
            }
        ]
    },
    remap: {
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        summary: 'キーの割り当てを自由自在に。ここに概要説明が入ります。',
        accordions: [
            {
                title: 'リマップの基本',
                img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
                text: 'ここにリマップの基本説明が入ります。'
            },
            {
                title: '応用例',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
                text: 'ここにリマップの応用例の説明が入ります。'
            }
        ]
    },
    combo: {
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        summary: '複数キーの組み合わせで新しい操作。ここに概要説明が入ります。',
        accordions: [
            {
                title: 'コンボの設定',
                img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                text: 'ここにコンボの設定説明が入ります。'
            },
            {
                title: '活用例',
                img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
                text: 'ここにコンボの活用例の説明が入ります。'
            }
        ]
    }
};

// 使い方の流れセクションのデータ
const howtoFlowSteps = [
    {
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        title: 'ステップ1',
        desc: 'アプリをダウンロードしてインストールします。'
    },
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
        title: 'ステップ2',
        desc: 'Karabiner Elementsと連携設定を行います。'
    },
    {
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        title: 'ステップ3',
        desc: 'キーリマップやレイヤー、コンボなどを設定します。'
    },
    {
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        title: 'ステップ4',
        desc: '設定を保存し、すぐに使い始めましょう。'
    },
    {
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
        title: 'ステップ5',
        desc: '困ったときはヘルプやサポートを活用しましょう。'
    }
];
let howtoFlowIndex = 0;

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
    // 細かい使い方セグメント切り替え
    const segment = document.getElementById('howtoSegment');
    if (!segment) return;
    const indicator = segment.querySelector('.segment-indicator');
    const options = segment.querySelectorAll('.segment-option');
    let activeIndex = 0;

    function updateIndicator() {
        const activeOption = options[activeIndex];
        const left = activeOption.offsetLeft;
        const width = activeOption.offsetWidth;
        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.width = `${width}px`;
    }

    options.forEach((option, idx) => {
        option.addEventListener('click', function() {
            if (activeIndex === idx) return;
            options[activeIndex].classList.remove('active');
            option.classList.add('active');
            activeIndex = idx;
            updateIndicator();
            // 既存のセグメント切り替えロジックも呼ぶ
            const value = option.dataset.value;
            updateDetailContent(value);
        });
    });

    window.addEventListener('resize', updateIndicator);
    updateIndicator();
    // 初期表示
    updateHowtoDetailSegment('macro');
    // 使い方の流れスライダー
    document.getElementById('howtoFlowPrev').addEventListener('click', function() {
        howtoFlowIndex = (howtoFlowIndex - 1 + howtoFlowSteps.length) % howtoFlowSteps.length;
        updateHowtoFlow();
    });
    document.getElementById('howtoFlowNext').addEventListener('click', function() {
        howtoFlowIndex = (howtoFlowIndex + 1) % howtoFlowSteps.length;
        updateHowtoFlow();
    });
    updateHowtoFlow();

    // --- アコーディオンsummaryの構造を自動修正 ---
    document.querySelectorAll('.howto-detail-accordion summary').forEach(summary => {
        // すでにaccordion-titleがなければwrap
        if (!summary.querySelector('.accordion-title')) {
            const textNodes = Array.from(summary.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim());
            if (textNodes.length > 0) {
                const span = document.createElement('span');
                span.className = 'accordion-title';
                span.textContent = textNodes.map(n => n.textContent).join('');
                // テキストノードをspanに置換
                textNodes.forEach(n => summary.removeChild(n));
                summary.insertBefore(span, summary.firstChild);
            }
        }
        // すでにaccordion-arrowがなければ追加
        if (!summary.querySelector('.accordion-arrow')) {
            const arrow = document.createElement('span');
            arrow.className = 'accordion-arrow';
            arrow.textContent = '▼';
            summary.appendChild(arrow);
        }
    });

    // サンプル風アコーディオン制御
    bindAccordionEvents();

    ensureAccordionInit();
    // DOMにアコーディオンリストが追加されたら初期化
    const observer = new MutationObserver(() => {
        ensureAccordionInit();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    ensureAccordionSVGIcons();
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
                    if (otherIcon) otherIcon.style.transform = '';
                }
            });
            
            // Toggle current accordion
            this.classList.toggle('active');
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                if (icon) icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            } else {
                if (icon) icon.style.transform = '';
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

function updateHowtoDetailSegment(segment) {
    const data = howtoDetailData[segment];
    document.getElementById('howtoDetailImage').innerHTML = `<img src="${data.image}" alt="${segment} image">`;
    document.getElementById('howtoDetailSummary').innerHTML = `<p>${data.summary}</p>`;
    // アコーディオンリスト生成（div+SVG構造に統一）
    const accordionList = data.accordions.map(acc => `
      <div class="howto-detail-accordion-item">
        <div class="howto-detail-accordion-header">
          <span class="accordion-title">${acc.title}</span>
          <span class="accordion-arrow"><svg viewBox='0 0 24 24'><polyline points='6 9 12 15 18 9'/></svg></span>
        </div>
        <div class="howto-detail-accordion-content">
          <div class="accordion-inner">
            <img src="${acc.img}" alt="${acc.title}">
            <p>${acc.text}</p>
          </div>
        </div>
      </div>
    `).join('');
    document.getElementById('howtoDetailAccordionList').innerHTML = accordionList;
    // バインド
    bindAccordionEvents();
}

function updateHowtoFlow() {
    const step = howtoFlowSteps[howtoFlowIndex];
    document.getElementById('howtoFlowImage').innerHTML = `<img src="${step.image}" alt="${step.title}">`;
    document.getElementById('howtoFlowText').innerHTML = `<h3>${step.title}</h3><p>${step.desc}</p>`;
}

// 細かい使い方セクションのセグメント切り替えアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const segmentInputs = document.querySelectorAll('input[name="howto-segment"]');
    const detailImage = document.getElementById('howtoDetailImage');
    const detailSummary = document.getElementById('howtoDetailSummary');
    const detailAccordionList = document.getElementById('howtoDetailAccordionList');

    segmentInputs.forEach(input => {
        input.addEventListener('change', function() {
            // フェードアウト
            detailImage.style.opacity = '0';
            detailSummary.style.opacity = '0';
            detailAccordionList.style.opacity = '0';
            
            setTimeout(() => {
                // 内容を更新（実際のアプリではここでAPI呼び出しなど）
                updateDetailContent(this.value);
                
                // フェードイン
                detailImage.style.opacity = '1';
                detailSummary.style.opacity = '1';
                detailAccordionList.style.opacity = '1';
            }, 150);
        });
    });
});

function updateDetailContent(segment) {
    const contentMap = {
        'macro': {
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
            summary: 'マクロ機能で複雑な操作も簡単に。ここに概要説明が入ります。',
            accordions: [
                { title: 'マクロの作成方法', content: 'ここにマクロの作成方法の説明が入ります。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80' },
                { title: '活用例', content: 'ここにマクロの活用例の説明が入ります。', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }
            ]
        },
        'device': {
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80',
            summary: 'デバイス編集機能でキーボード設定をカスタマイズ。',
            accordions: [
                { title: 'デバイス設定', content: 'デバイスの詳細設定方法を説明します。', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
                { title: '設定例', content: '実際の設定例を紹介します。', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }
            ]
        },
        'remap': {
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
            summary: 'キーのリマップ機能で自由自在にカスタマイズ。',
            accordions: [
                { title: 'リマップ手順', content: 'キーのリマップ手順を説明します。', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
                { title: '設定例', content: 'リマップの設定例を紹介します。', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80' }
            ]
        },
        'combo': {
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
            summary: 'コンボ機能で複数キーの組み合わせを設定。',
            accordions: [
                { title: 'コンボ設定', content: 'コンボの設定方法を説明します。', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
                { title: '活用例', content: 'コンボの活用例を紹介します。', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }
            ]
        }
    };

    const content = contentMap[segment];
    if (content) {
        const detailImage = document.getElementById('howtoDetailImage');
        const detailSummary = document.getElementById('howtoDetailSummary');
        const detailAccordionList = document.getElementById('howtoDetailAccordionList');

        // 画像更新
        detailImage.querySelector('img').src = content.image;
        detailImage.querySelector('img').alt = segment + ' Tab';

        // 概要更新
        detailSummary.querySelector('p').textContent = content.summary;

        // アコーディオン更新
        detailAccordionList.innerHTML = '';
        content.accordions.forEach(accordion => {
            const item = document.createElement('div');
            item.className = 'howto-detail-accordion-item';
            item.innerHTML = `
                <div class="howto-detail-accordion-header">
                  <span class="accordion-title">${accordion.title}</span>
                  <span class="accordion-arrow"><svg viewBox='0 0 24 24'><polyline points='6 9 12 15 18 9'/></svg></span>
                </div>
                <div class="howto-detail-accordion-content">
                  <div class="accordion-inner">
                    <img src="${accordion.image}" alt="${accordion.title}">
                    <p>${accordion.content}</p>
                  </div>
                </div>
            `;
            detailAccordionList.appendChild(item);
        });
        // アコーディオンのイベント再バインド
        bindAccordionEvents();
    }
}

function bindAccordionEvents() {
  const accItems = document.querySelectorAll('.howto-detail-accordion-item');
  accItems.forEach((item) => {
    const header = item.querySelector('.howto-detail-accordion-header');
    const content = item.querySelector('.howto-detail-accordion-content');
    // 既存のイベントを一度remove（多重バインド防止）
    header.onclick = null;
    header.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      if (isActive) {
        item.classList.remove('active');
        if (content) content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        if (content) content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
    // 初期化: activeならmax-heightセット
    if (item.classList.contains('active')) {
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      if (content) content.style.maxHeight = null;
    }
  });
  // 初期状態で一つもactiveがなければ一つ目を開く → 何もしない（全て閉じておく）
}

function ensureAccordionInit() {
  const accList = document.querySelector('.howto-detail-accordion-list');
  if (accList && !accList.dataset._accordionInit) {
    accList.dataset._accordionInit = '1';
    bindAccordionEvents();
  }
}

function ensureAccordionSVGIcons() {
  document.querySelectorAll('.howto-detail-accordion-header .accordion-arrow').forEach(arrow => {
    // ▼や▲などテキストノードのみの場合はSVGに置換
    if (arrow.childNodes.length === 1 && arrow.textContent.trim().match(/^[▼▲]$/)) {
      arrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>';
    }
  });
}

// --- サイドインデックスの表示制御（ヒーローセクションを過ぎたらアニメーションで表示） ---
(function() {
  const sideIndex = document.querySelector('.side-index');
  const hero = document.querySelector('.hero-section');
  if (!sideIndex || !hero) return;
  function updateSideIndexVisibility() {
    const heroRect = hero.getBoundingClientRect();
    const threshold = 80;
    if (heroRect.bottom - threshold <= 0) {
      sideIndex.classList.add('visible');
    } else if (heroRect.bottom - threshold > 40) {
      sideIndex.classList.remove('visible');
    } else {
      // スクロール途中で徐々に現れる
      const ratio = 1 - Math.max(0, heroRect.bottom - threshold) / 40;
      sideIndex.style.opacity = ratio;
      sideIndex.style.transform = `translateY(${(1 - ratio) * 40}px)`;
      sideIndex.style.pointerEvents = ratio > 0.5 ? 'auto' : 'none';
      if (ratio >= 1) sideIndex.classList.add('visible');
      else sideIndex.classList.remove('visible');
      return;
    }
    // 完全に非表示/表示のときはCSSに任せる
    sideIndex.style.opacity = '';
    sideIndex.style.transform = '';
    sideIndex.style.pointerEvents = '';
  }
  window.addEventListener('scroll', updateSideIndexVisibility, {passive:true});
  window.addEventListener('resize', updateSideIndexVisibility);
  document.addEventListener('DOMContentLoaded', updateSideIndexVisibility);
})();

// --- サイドインデックスの現在位置ハイライト ---
(function() {
  const sectionIds = [
    'section-tutorial',
    'section-features',
    'section-flow',
    'section-detail',
    'section-developer'
  ];
  const nav = document.querySelector('.side-index');
  if (!nav) return;
  const items = nav.querySelectorAll('li');
  function updateActiveIndex() {
    let found = false;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sec = document.getElementById(sectionIds[i]);
      if (sec) {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.33) {
          items.forEach(li => li.classList.remove('active', 'current'));
          items[i].classList.add('active', 'current');
          found = true;
          break;
        }
      }
    }
    if (!found) items.forEach(li => li.classList.remove('active', 'current'));
  }
  window.addEventListener('scroll', updateActiveIndex, {passive:true});
  window.addEventListener('resize', updateActiveIndex);
  document.addEventListener('DOMContentLoaded', updateActiveIndex);
})();

// --- 機能カードのクリックでテキスト切り替え ---
(function() {
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('click', function() {
      const mediaBg = this.querySelector('.feature-media-bg');
      const primaryMedia = mediaBg.querySelector('.feature-media-primary');
      const exampleMedia = mediaBg.querySelector('.feature-media-example');
      
      if (primaryMedia && exampleMedia) {
          if (primaryMedia.style.display === 'none') {
              primaryMedia.style.display = '';
              exampleMedia.style.display = 'none';
          } else {
              primaryMedia.style.display = 'none';
              exampleMedia.style.display = '';
          }
      }
    });
  });
})();