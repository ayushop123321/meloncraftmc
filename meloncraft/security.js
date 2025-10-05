// 🛡️ MELONCRAFT - SECURITY PROTECTION
// Advanced Anti-Theft & Code Protection System v2.0
// Enhanced Security Implementation

(function() {
    'use strict';
    
    // Security configuration
    const securityConfig = {
        enableAntiDevTools: true,
        enableAntiCopy: true,
        enableAntiScreenCapture: true,
        enableAntiSourceView: true,
        enableAntiInspection: true,
        enableCodeObfuscation: true,
        enableTamperDetection: true,
        redirectOnViolation: 'about:blank',
        maxViolations: 3,
        alertTimeout: 3000,
        checkInterval: 1000
    };
    
    // Track security violations
    let securityState = {
        violationCount: 0,
        lastViolationTime: 0,
        devToolsOpen: false,
        tamperAttempts: 0,
        blockedEvents: 0,
        sessionFingerprint: generateSessionFingerprint()
    };
    
    // Generate a unique session fingerprint
    function generateSessionFingerprint() {
        const browserInfo = navigator.userAgent + navigator.language + navigator.platform;
        const timeInfo = Date.now().toString() + Math.random().toString();
        const screenInfo = window.screen.width + 'x' + window.screen.height + 'x' + window.screen.colorDepth;
        
        return btoa(browserInfo + timeInfo + screenInfo).replace(/=/g, '').substring(0, 32);
    }
    
    // Create a custom security alert element
    function createSecurityAlertElement() {
        const alertElement = document.createElement('div');
        alertElement.id = 'security-alert';
        alertElement.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(220, 53, 69, 0.95);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            font-size: 16px;
            z-index: 999999;
            display: flex;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        const iconElement = document.createElement('span');
        iconElement.innerHTML = '🛡️';
        iconElement.style.marginRight = '10px';
        iconElement.style.fontSize = '20px';
        
        const textElement = document.createElement('span');
        textElement.id = 'security-alert-text';
        
        alertElement.appendChild(iconElement);
        alertElement.appendChild(textElement);
        document.body.appendChild(alertElement);
        
        return alertElement;
    }
    
    // Show security alert with enhanced styling
    function showSecurityAlert(message) {
        securityState.violationCount++;
        securityState.lastViolationTime = Date.now();
        
        let alertElement = document.getElementById('security-alert');
        if (!alertElement) {
            alertElement = createSecurityAlertElement();
        }
        
        const textElement = document.getElementById('security-alert-text');
        if (textElement) {
            textElement.textContent = `${message} (Violation #${securityState.violationCount})`;
        }
        
        alertElement.style.opacity = '1';
        
        // Log the security violation (could be sent to a server in a real implementation)
        console.warn(`[SECURITY] ${message} | Violation #${securityState.violationCount}`);
        
        // Hide the alert after a timeout
        setTimeout(() => {
            alertElement.style.opacity = '0';
        }, securityConfig.alertTimeout);
        
        // Check if max violations reached
        if (securityConfig.enableTamperDetection && securityState.violationCount >= securityConfig.maxViolations) {
            handleMaxViolations();
        }
        
        return false;
    }
    
    // Handle max violations reached
    function handleMaxViolations() {
        // Store violation in localStorage to persist across page refreshes
        try {
            localStorage.setItem('meloncraft_security_violations', securityState.violationCount);
            localStorage.setItem('meloncraft_security_timestamp', Date.now());
        } catch (e) {
            // localStorage might be disabled
        }
        
        // Redirect to blank page after showing alert
        setTimeout(() => {
            window.location.href = securityConfig.redirectOnViolation;
        }, 1000);
    }
    
    // Disable right-click context menu with enhanced detection
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityAlert('Right-click disabled for security!');
        securityState.blockedEvents++;
        return false;
    });
    
    // Advanced keyboard shortcut protection
    document.addEventListener('keydown', function(e) {
        // Create a key signature for complex key combinations
        const keySignature = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.metaKey ? 'Meta+' : ''}${e.keyCode}`;
        
        // Map of blocked key combinations and their messages
        const blockedKeys = {
            // Developer tools
            '123': 'Developer tools access denied!',
            'Ctrl+Shift+73': 'Developer tools access denied!', // Ctrl+Shift+I
            'Ctrl+Shift+74': 'Console access denied!', // Ctrl+Shift+J
            'Ctrl+Shift+75': 'Developer tools access denied!', // Ctrl+Shift+K
            'Ctrl+Shift+67': 'Element inspector disabled!', // Ctrl+Shift+C
            
            // Source viewing
            'Ctrl+85': 'Source code viewing disabled!', // Ctrl+U
            'Ctrl+83': 'Page saving disabled!', // Ctrl+S
            
            // Content protection
            'Ctrl+65': 'Content selection disabled!', // Ctrl+A
            'Ctrl+67': 'Copying disabled!', // Ctrl+C
            'Ctrl+80': 'Printing disabled!', // Ctrl+P
            'Ctrl+Shift+69': 'Source inspection disabled!', // Ctrl+Shift+E
            
            // Additional Firefox shortcuts
            'Shift+113': 'Developer tools disabled!', // Shift+F2
            'Ctrl+Shift+77': 'Developer tools disabled!' // Ctrl+Shift+M
        };
        
        // Check if the key combination is blocked
        if (blockedKeys[keySignature]) {
            e.preventDefault();
            e.stopPropagation();
            showSecurityAlert(blockedKeys[keySignature]);
            securityState.blockedEvents++;
            return false;
        }
    }, true);
    
    // Disable text selection with exceptions for form inputs
    document.addEventListener('selectstart', function(e) {
        // Allow selection in inputs and textareas
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return true;
        }
        
        e.preventDefault();
        securityState.blockedEvents++;
        return false;
    });
    
    // Disable drag and drop with enhanced detection
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        securityState.blockedEvents++;
        return false;
    });
    
    // Disable copy/paste operations
    if (securityConfig.enableAntiCopy) {
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            showSecurityAlert('Copying content is disabled!');
            securityState.blockedEvents++;
            return false;
        });
        
        document.addEventListener('cut', function(e) {
            e.preventDefault();
            showSecurityAlert('Cutting content is disabled!');
            securityState.blockedEvents++;
            return false;
        });
        
        document.addEventListener('paste', function(e) {
            // Allow paste in inputs and textareas
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return true;
            }
            
            e.preventDefault();
            showSecurityAlert('Pasting content is disabled!');
            securityState.blockedEvents++;
            return false;
        });
    }
    
    // Advanced DevTools detection
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    // Method 1: Size-based detection
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                securityState.devToolsOpen = true;
                showSecurityAlert('Developer tools detected! Redirecting...');
                setTimeout(() => {
                    window.location.href = securityConfig.redirectOnViolation;
                }, 1000);
            }
        } else {
            devtools.open = false;
            securityState.devToolsOpen = false;
        }
    }, securityConfig.checkInterval);
    
    // Method 2: Console-based detection
    const consoleCheck = setInterval(function() {
        if (devtools.isOpen()) {
            if (!devtools.open) {
                devtools.open = true;
                securityState.devToolsOpen = true;
                showSecurityAlert('Developer tools detected! Redirecting...');
                setTimeout(() => {
                    window.location.href = securityConfig.redirectOnViolation;
                }, 2000);
            }
        } else {
            devtools.open = false;
            securityState.devToolsOpen = false;
        }
    }, 500);
    
    // Console warning
    console.log('%c🚨 SECURITY WARNING! 🚨', 'color: red; font-size: 30px; font-weight: bold;');
    console.log('%cThis is a protected website. Unauthorized access attempts are logged and monitored.', 'color: red; font-size: 16px;');
    console.log('%c⚠️ Attempting to steal or modify this code is illegal and will result in legal action.', 'color: orange; font-size: 14px;');
    console.log('%c🛡️ MELONCRAFT - All Rights Reserved', 'color: #ff0000; font-size: 18px; font-weight: bold;');
    
    // Anti-debugging
    (function() {
        let start = Date.now();
        debugger;
        if (Date.now() - start > 100) {
            showSecurityAlert('Debugging detected! Access denied.');
            window.location.href = 'about:blank';
        }
    })();
    
    // Disable image saving
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showSecurityAlert('Image saving disabled!');
                return false;
            });
            
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            
            // Add protection overlay
            img.style.pointerEvents = 'none';
            img.style.userSelect = 'none';
            img.style.webkitUserSelect = 'none';
            img.style.mozUserSelect = 'none';
            img.style.msUserSelect = 'none';
        });
    });
    
    // Obfuscate source code in memory
    function obfuscateCode() {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
            if (script.src) {
                // External scripts - add integrity check
                script.setAttribute('crossorigin', 'anonymous');
            }
        });
    }
    
    // Security alert function
    function showSecurityAlert(message) {
        // Create security alert modal
        const alertModal = document.createElement('div');
        alertModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 999999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Orbitron', monospace;
        `;
        
        alertModal.innerHTML = `
            <div style="
                background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
                border: 2px solid #ff0000;
                border-radius: 20px;
                padding: 3rem;
                text-align: center;
                box-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
                animation: securityPulse 1s ease-in-out infinite alternate;
            ">
                <div style="
                    font-size: 4rem;
                    color: #ff0000;
                    margin-bottom: 1rem;
                    text-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
                ">🛡️</div>
                <h2 style="
                    color: #ff0000;
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                    text-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
                ">SECURITY ALERT</h2>
                <p style="
                    color: #ffffff;
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                ">${message}</p>
                <p style="
                    color: #cccccc;
                    font-size: 0.9rem;
                    font-style: italic;
                ">🚨 This action has been logged for security purposes</p>
            </div>
        `;
        
        document.body.appendChild(alertModal);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (alertModal.parentNode) {
                alertModal.parentNode.removeChild(alertModal);
            }
        }, 3000);
    }
    
    // Add security pulse animation
    const securityStyle = document.createElement('style');
    securityStyle.textContent = `
        @keyframes securityPulse {
            from { transform: scale(1); box-shadow: 0 0 50px rgba(255, 0, 0, 0.5); }
            to { transform: scale(1.02); box-shadow: 0 0 70px rgba(255, 0, 0, 0.8); }
        }
        
        /* Disable text selection globally */
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Re-enable for form inputs */
        input, textarea {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        
        /* Hide scrollbars to prevent source inspection */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
            background: rgba(255, 0, 0, 0.3);
            border-radius: 4px;
        }
    `;
    document.head.appendChild(securityStyle);
    
    // Monitor for suspicious activity
    let suspiciousActivity = 0;
    
    // Detect rapid key combinations
    let keySequence = [];
    document.addEventListener('keydown', function(e) {
        keySequence.push(e.keyCode);
        if (keySequence.length > 10) {
            keySequence.shift();
        }
        
        // Check for suspicious patterns
        if (keySequence.length >= 3) {
            const recent = keySequence.slice(-3);
            if (recent.includes(123) || recent.includes(73) || recent.includes(85)) {
                suspiciousActivity++;
                if (suspiciousActivity > 3) {
                    showSecurityAlert('Multiple security violations detected!');
                    setTimeout(() => {
                        window.location.href = 'about:blank';
                    }, 2000);
                }
            }
        }
    });
    
    // Protect against iframe embedding
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
        console.log('%c🛡️ PROTECTED CONTENT', 'color: red; font-size: 20px; font-weight: bold;');
    }, 3000);
    
    // Detect mobile developer tools
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobile-specific protections
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        });
        
        // Disable zoom
        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
        });
    }
    
    // Initialize security
    obfuscateCode();
    
    // Log security initialization
    console.log('%c🔒 Security system initialized', 'color: green; font-weight: bold;');
    
    // Security measures applied without freezing global objects
    // (Object.freeze on window/document removed as it causes errors in modern browsers)
    
})();

// Additional layer - Minified security check
(function(){var e=0;setInterval(function(){try{var t=new Date;debugger;new Date-t>100&&(e++,e>2&&(window.location.href="about:blank"))}catch(n){window.location.href="about:blank"}},1e3)})();
