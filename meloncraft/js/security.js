// 🛡️ MELONCRAFT - SECURITY PROTECTION
// Advanced Anti-Theft & Code Protection System v3.0
// Enhanced Security Implementation with Centralized Configuration

import { securitySettings } from '../api/config.js';

(function() {
    'use strict';
    
    // Security configuration from centralized config
    const securityConfig = securitySettings;
    
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
            background-color: #ff3860;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(alertElement);
        return alertElement;
    }
    
    // Show security alert
    function showSecurityAlert(message) {
        let alertElement = document.getElementById('security-alert');
        if (!alertElement) {
            alertElement = createSecurityAlertElement();
        }
        
        alertElement.textContent = message;
        alertElement.style.opacity = '1';
        
        setTimeout(() => {
            alertElement.style.opacity = '0';
        }, securityConfig.alertTimeout);
        
        // Log security event
        securityState.violationCount++;
        securityState.lastViolationTime = Date.now();
        
        // Check if max violations exceeded
        if (securityState.violationCount >= securityConfig.maxViolations) {
            window.location.href = securityConfig.redirectOnViolation;
        }
    }
    
    // Anti-DevTools detection
    if (securityConfig.enableAntiDevTools) {
        // Method 1: Console timing detection
        const devToolsDetector = function() {
            const start = performance.now();
            debugger;
            const end = performance.now();
            
            if (end - start > 100) {
                securityState.devToolsOpen = true;
                showSecurityAlert('Developer tools detected! This action has been logged.');
            }
        };
        
        // Method 2: Window size detection
        const checkWindowSize = function() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                securityState.devToolsOpen = true;
                showSecurityAlert('Developer tools detected! This action has been logged.');
            }
        };
        
        // Run detections periodically
        setInterval(devToolsDetector, securityConfig.checkInterval);
        setInterval(checkWindowSize, securityConfig.checkInterval);
    }
    
    // Anti-copy protection
    if (securityConfig.enableAntiCopy) {
        document.addEventListener('copy', function(e) {
            e.preventDefault();
            showSecurityAlert('Copying content is not allowed!');
            securityState.blockedEvents++;
            return false;
        });
        
        document.addEventListener('cut', function(e) {
            e.preventDefault();
            showSecurityAlert('Cutting content is not allowed!');
            securityState.blockedEvents++;
            return false;
        });
        
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showSecurityAlert('Right-click is disabled!');
            securityState.blockedEvents++;
            return false;
        });
    }
    
    // Anti-inspection protection
    if (securityConfig.enableAntiInspection) {
        // Override inspect element context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        // Disable keyboard shortcuts for inspect element
        document.addEventListener('keydown', function(e) {
            // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, F12
            if (
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                e.keyCode === 123
            ) {
                e.preventDefault();
                showSecurityAlert('Keyboard shortcut for developer tools detected!');
                securityState.blockedEvents++;
                return false;
            }
        });
    }
    
    // Anti-source view protection
    if (securityConfig.enableAntiSourceView) {
        // Disable view source keyboard shortcut
        document.addEventListener('keydown', function(e) {
            // Ctrl+U
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                showSecurityAlert('View source attempt detected!');
                securityState.blockedEvents++;
                return false;
            }
        });
    }
    
    // Tamper detection
    if (securityConfig.enableTamperDetection) {
        // Monitor for DOM modifications
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.target.nodeName === 'SCRIPT') {
                    securityState.tamperAttempts++;
                    showSecurityAlert('Script modification detected!');
                }
            });
        });
        
        observer.observe(document, {
            childList: true,
            subtree: true
        });
        
        // Check for script integrity
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const script = scripts[i];
            if (script.src && !script.integrity) {
                console.warn('Script without integrity attribute:', script.src);
            }
        }
    }
    
    // Log security initialization
    console.log('MelonCraft security system initialized');
    
    // Export security state for monitoring
    window.meloncraftSecurity = {
        getState: function() {
            return { ...securityState };
        }
    };
})();