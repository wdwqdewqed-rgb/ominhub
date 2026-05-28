import { Router } from "../../utils/router.js";
import { I18n } from "../../features/i18n.js";
import { CookiesController } from "./cookiesController.js";

function renderCookies(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="Cookies & Tracking Technologies">Cookies & Tracking Technologies</h1>
        <p class="section-subtitle" data-translate="We use cookies and similar technologies to enhance your experience on OMINHUB. This page explains what cookies are, how we use them, and how you can control them.">We use cookies and similar technologies to enhance your experience on OMINHUB. This page explains what cookies are, how we use them, and how you can control them.</p>
        
        <div class="cookie-manager">
          <div class="cookie-header">
            <h2 data-translate="Cookie Preferences Manager">🎛️ Cookie Preferences Manager</h2>
            <p data-translate="Control which cookies you allow on OMINHUB:">Control which cookies you allow on OMINHUB:</p>
          </div>
          
          <div class="cookie-controls">
            <!-- Essential Cookies (Always Required) -->
            <div class="cookie-setting">
              <div class="cookie-setting-header">
                <div class="cookie-setting-info">
                  <h3 data-translate="Essential Cookies">🍪 Essential Cookies</h3>
                  <span class="cookie-required" data-translate="Required">Required</span>
                </div>
                <label class="cookie-switch">
                  <input type="checkbox" checked disabled>
                  <span class="cookie-slider"></span>
                </label>
              </div>
              <p class="cookie-desc" data-translate="These cookies are necessary for the platform to function. They enable basic features like page navigation, login sessions, and security. You cannot opt-out of these cookies.">These cookies are necessary for the platform to function. They enable basic features like page navigation, login sessions, and security. You cannot opt-out of these cookies.</p>
              <div class="cookie-examples">
                <strong data-translate="Examples:">Examples:</strong> <span data-translate="Session authentication, security tokens, age verification status">Session authentication, security tokens, age verification status</span>
              </div>
            </div>
            
            <!-- Analytics Cookies -->
            <div class="cookie-setting">
              <div class="cookie-setting-header">
                <div class="cookie-setting-info">
                  <h3 data-translate="Analytics & Performance Cookies">📊 Analytics & Performance Cookies</h3>
                  <span class="cookie-optional" data-translate="Optional">Optional</span>
                </div>
                <label class="cookie-switch">
                  <input type="checkbox" id="analytics-cookies" checked>
                  <span class="cookie-slider"></span>
                </label>
              </div>
              <p class="cookie-desc" data-translate="These cookies help us understand how visitors interact with OMINHUB. They collect anonymous information about page visits, feature usage, and platform performance.">These cookies help us understand how visitors interact with OMINHUB. They collect anonymous information about page visits, feature usage, and platform performance.</p>
              <div class="cookie-examples">
                <strong data-translate="Examples:">Examples:</strong> <span data-translate="Google Analytics, platform performance monitoring, feature usage tracking">Google Analytics, platform performance monitoring, feature usage tracking</span>
              </div>
            </div>
            
            <!-- Preference Cookies -->
            <div class="cookie-setting">
              <div class="cookie-setting-header">
                <div class="cookie-setting-info">
                  <h3 data-translate="Preference & Functionality Cookies">🎯 Preference & Functionality Cookies</h3>
                  <span class="cookie-optional" data-translate="Optional">Optional</span>
                </div>
                <label class="cookie-switch">
                  <input type="checkbox" id="preference-cookies" checked>
                  <span class="cookie-slider"></span>
                </label>
              </div>
              <p class="cookie-desc" data-translate="These cookies remember your choices to provide a personalized experience. They save settings like language, content filters, and display preferences.">These cookies remember your choices to provide a personalized experience. They save settings like language, content filters, and display preferences.</p>
              <div class="cookie-examples">
                <strong data-translate="Examples:">Examples:</strong> <span data-translate="Language selection, content maturity filters, video player settings">Language selection, content maturity filters, video player settings</span>
              </div>
            </div>
            
            <!-- Advertising Cookies -->
            <div class="cookie-setting">
              <div class="cookie-setting-header">
                <div class="cookie-setting-info">
                  <h3 data-translate="Advertising & Marketing Cookies">📱 Advertising & Marketing Cookies</h3>
                  <span class="cookie-optional" data-translate="Optional">Optional</span>
                </div>
                <label class="cookie-switch">
                  <input type="checkbox" id="advertising-cookies" checked>
                  <span class="cookie-slider"></span>
                </label>
              </div>
              <p class="cookie-desc" data-translate="These cookies are used to show you relevant content recommendations and creator suggestions based on your viewing history and preferences.">These cookies are used to show you relevant content recommendations and creator suggestions based on your viewing history and preferences.</p>
              <div class="cookie-examples">
                <strong data-translate="Examples:">Examples:</strong> <span data-translate="Creator recommendations, content suggestions, personalized feed">Creator recommendations, content suggestions, personalized feed</span>
              </div>
            </div>
          </div>
          
          <div class="cookie-actions">
            <button class="nav-button" id="accept-all-cookies" data-translate="Accept All Cookies">Accept All Cookies</button>
            <button class="nav-button nav-button-outline" id="save-cookie-prefs" data-translate="Save Current Preferences">Save Current Preferences</button>
            <button class="nav-button nav-button-outline" id="reject-all-cookies" data-translate="Reject All Optional Cookies">Reject All Optional Cookies</button>
          </div>
          
          <div class="cookie-status" id="cookie-status">
            <span class="cookie-status-icon">✅</span>
            <span class="cookie-status-text" data-translate="Your preferences will be saved for this browser.">Your preferences will be saved for this browser.</span>
          </div>
        </div>
        
        <div class="cookies-content" style="margin-top: 40px;">
          <h2 data-translate="Detailed Cookie Information">📋 Detailed Cookie Information</h2>
          
          <div class="cookie-table-container">
            <table class="cookie-table">
              <thead>
                <tr>
                  <th data-translate="Cookie Name">Cookie Name</th>
                  <th data-translate="Provider">Provider</th>
                  <th data-translate="Purpose">Purpose</th>
                  <th data-translate="Duration">Duration</th>
                  <th data-translate="Type">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ominhub_session</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Maintains your login session and authentication">Maintains your login session and authentication</td>
                  <td data-translate="30 days">30 days</td>
                  <td><span class="cookie-badge essential" data-translate="Essential">Essential</span></td>
                </tr>
                <tr>
                  <td><code>age_verified</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Remembers age verification status">Remembers age verification status</td>
                  <td data-translate="90 days">90 days</td>
                  <td><span class="cookie-badge essential" data-translate="Essential">Essential</span></td>
                </tr>
                <tr>
                  <td><code>content_prefs</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Stores your content preferences and maturity filters">Stores your content preferences and maturity filters</td>
                  <td data-translate="365 days">365 days</td>
                  <td><span class="cookie-badge preference" data-translate="Preference">Preference</span></td>
                </tr>
                <tr>
                  <td><code>player_settings</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Remembers video player preferences (quality, autoplay)">Remembers video player preferences (quality, autoplay)</td>
                  <td data-translate="Session">Session</td>
                  <td><span class="cookie-badge preference" data-translate="Preference">Preference</span></td>
                </tr>
                <tr>
                  <td><code>_ga</code></td>
                  <td data-translate="Google Analytics">Google Analytics</td>
                  <td data-translate="Distinguishes unique users for analytics">Distinguishes unique users for analytics</td>
                  <td data-translate="2 years">2 years</td>
                  <td><span class="cookie-badge analytics" data-translate="Analytics">Analytics</span></td>
                </tr>
                <tr>
                  <td><code>_gid</code></td>
                  <td data-translate="Google Analytics">Google Analytics</td>
                  <td data-translate="Distinguishes users for 24-hour periods">Distinguishes users for 24-hour periods</td>
                  <td data-translate="24 hours">24 hours</td>
                  <td><span class="cookie-badge analytics" data-translate="Analytics">Analytics</span></td>
                </tr>
                <tr>
                  <td><code>creator_recs</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Stores creator recommendations based on viewing history">Stores creator recommendations based on viewing history</td>
                  <td data-translate="30 days">30 days</td>
                  <td><span class="cookie-badge advertising" data-translate="Advertising">Advertising</span></td>
                </tr>
                <tr>
                  <td><code>content_suggestions</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Remembers content you might be interested in">Remembers content you might be interested in</td>
                  <td data-translate="14 days">14 days</td>
                  <td><span class="cookie-badge advertising" data-translate="Advertising">Advertising</span></td>
                </tr>
                <tr>
                  <td><code>lang_pref</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Remembers your language preference">Remembers your language preference</td>
                  <td data-translate="365 days">365 days</td>
                  <td><span class="cookie-badge preference" data-translate="Preference">Preference</span></td>
                </tr>
                <tr>
                  <td><code>consent_status</code></td>
                  <td data-translate="OMINHUB">OMINHUB</td>
                  <td data-translate="Stores your cookie consent preferences">Stores your cookie consent preferences</td>
                  <td data-translate="365 days">365 days</td>
                  <td><span class="cookie-badge essential" data-translate="Essential">Essential</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="cookie-info">
            <h3 data-translate="Third-Party Cookies">🔒 Third-Party Cookies</h3>
            <p data-translate="Some third-party services we use may set their own cookies:">Some third-party services we use may set their own cookies:</p>
            <div class="third-party-cookies">
              <div class="third-party-service">
                <h4 data-translate="Payment Processors">Payment Processors</h4>
                <p><strong data-translate="Stripe, PayPal">Stripe, PayPal</strong> - <span data-translate="For secure payment processing and fraud prevention">For secure payment processing and fraud prevention</span></p>
              </div>
              <div class="third-party-service">
                <h4 data-translate="Age Verification">Age Verification</h4>
                <p><strong data-translate="Veriff, Jumio">Veriff, Jumio</strong> - <span data-translate="For identity and age verification">For identity and age verification</span></p>
              </div>
              <div class="third-party-service">
                <h4 data-translate="Content Delivery">Content Delivery</h4>
                <p><strong data-translate="Cloudflare">Cloudflare</strong> - <span data-translate="For faster content loading and DDoS protection">For faster content loading and DDoS protection</span></p>
              </div>
              <div class="third-party-service">
                <h4 data-translate="Analytics">Analytics</h4>
                <p><strong data-translate="Google Analytics">Google Analytics</strong> - <span data-translate="For platform improvement and user experience research">For platform improvement and user experience research</span></p>
              </div>
            </div>
            
            <h3 data-translate="Do Not Track Browser Setting">🚫 "Do Not Track" Browser Setting</h3>
            <p data-translate="We respect the Do Not Track (DNT) browser setting. When DNT is enabled, all analytics and advertising cookies are automatically disabled, and we minimize data collection to only what's essential for platform functionality.">We respect the "Do Not Track" (DNT) browser setting. When DNT is enabled, all analytics and advertising cookies are automatically disabled, and we minimize data collection to only what's essential for platform functionality.</p>
            
            <h3 data-translate="How to Manage Cookies in Your Browser">🧹 How to Manage Cookies in Your Browser</h3>
            <div class="browser-guide">
              <div class="browser-step">
                <div class="browser-icon">🌐</div>
                <div class="browser-content">
                  <h4 data-translate="Google Chrome">Google Chrome</h4>
                  <p data-translate="Settings → Privacy and security → Cookies and other site data">Settings → Privacy and security → Cookies and other site data</p>
                  <p data-translate="You can block third-party cookies, clear cookies on exit, or view all cookies stored.">You can block third-party cookies, clear cookies on exit, or view all cookies stored.</p>
                </div>
              </div>
              
              <div class="browser-step">
                <div class="browser-icon">🦊</div>
                <div class="browser-content">
                  <h4 data-translate="Mozilla Firefox">Mozilla Firefox</h4>
                  <p data-translate="Preferences → Privacy & Security → Cookies and Site Data">Preferences → Privacy & Security → Cookies and Site Data</p>
                  <p data-translate="Firefox offers enhanced tracking protection and cookie classification.">Firefox offers enhanced tracking protection and cookie classification.</p>
                </div>
              </div>
              
              <div class="browser-step">
                <div class="browser-icon">🍎</div>
                <div class="browser-content">
                  <h4 data-translate="Safari">Safari</h4>
                  <p data-translate="Preferences → Privacy → Cookies and website data">Preferences → Privacy → Cookies and website data</p>
                  <p data-translate="Safari automatically blocks third-party cookies by default.">Safari automatically blocks third-party cookies by default.</p>
                </div>
              </div>
              
              <div class="browser-step">
                <div class="browser-icon">🪟</div>
                <div class="browser-content">
                  <h4 data-translate="Microsoft Edge">Microsoft Edge</h4>
                  <p data-translate="Settings → Cookies and site permissions → Cookies and site data">Settings → Cookies and site permissions → Cookies and site data</p>
                  <p data-translate="Edge offers tracking prevention with three levels of strictness.">Edge offers tracking prevention with three levels of strictness.</p>
                </div>
              </div>
            </div>
            
            <h3 data-translate="Mobile Browsers">📱 Mobile Browsers</h3>
            <p data-translate="On mobile devices, cookie settings are typically found in the browser's settings menu under Privacy or Site Settings.">On mobile devices, cookie settings are typically found in the browser's settings menu under "Privacy" or "Site Settings."</p>
            
            <div class="cookie-note warning">
              <h4 data-translate="Important Note">⚠️ Important Note</h4>
              <p data-translate="Disabling certain cookies may limit platform functionality:">Disabling certain cookies may limit platform functionality:</p>
              <ul>
                <li data-translate="Essential cookies cannot be disabled without breaking core functionality">Essential cookies cannot be disabled without breaking core functionality</li>
                <li data-translate="Disabling preference cookies will reset your settings on each visit">Disabling preference cookies will reset your settings on each visit</li>
                <li data-translate="Analytics cookies help us improve the platform for everyone">Analytics cookies help us improve the platform for everyone</li>
                <li data-translate="Advertising cookies provide personalized content recommendations">Advertising cookies provide personalized content recommendations</li>
              </ul>
            </div>
            
            <div class="cookie-note info">
              <h4 data-translate="Cookie Policy Updates">ℹ️ Cookie Policy Updates</h4>
              <p data-translate="We may update this cookie policy from time to time. When we make significant changes, we'll notify users through platform notifications or email. The Last Updated date at the top of this page indicates when the policy was last revised.">We may update this cookie policy from time to time. When we make significant changes, we'll notify users through platform notifications or email. The "Last Updated" date at the top of this page indicates when the policy was last revised.</p>
              <p><strong data-translate="Last Updated:">Last Updated:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            
            <div class="cookie-contact">
              <h3 data-translate="Questions About Cookies?">❓ Questions About Cookies?</h3>
              <p data-translate="If you have questions about our use of cookies or need assistance managing your preferences, contact our privacy team:">If you have questions about our use of cookies or need assistance managing your preferences, contact our privacy team:</p>
              <p><strong data-translate="Email:">Email:</strong> privacy@ominhub.com</p>
              <p><strong data-translate="Response Time:">Response Time:</strong> <span data-translate="Within 48 hours for cookie-related inquiries">Within 48 hours for cookie-related inquiries</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

    // Aplicar traducciones inmediatamente después de renderizar
    const currentLang = Storage.getStored("ominhub_lang", "en");
    I18n.translateUI(currentLang);

    // Guardar textos originales para futuras traducciones
    I18n.saveOriginalTexts();

    // Add cookie functionality
    CookiesController.setupCookieControls();
    Router.wireNavigation();
  }

  export const Cookies = {
    renderCookies
}