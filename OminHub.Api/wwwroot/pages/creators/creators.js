import { I18n } from "../../features/i18n.js";
import { Router } from "../../utils/router.js";

function renderCreators(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="Creator Program">🎬 Creator Program</h1>
        <p class="section-subtitle" data-translate="Transform your passion into a sustainable income. Join thousands of creators building their business on OMINHUB.">Transform your passion into a sustainable income. Join thousands of creators building their business on OMINHUB.</p>
        
        <!-- Hero Section -->
        <div class="creator-hero-stats">
          <div class="hero-stat">
            <div class="stat-number">80%</div>
            <div class="stat-label" data-translate="Industry-leading revenue share">Industry-leading revenue share</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">$50</div>
            <div class="stat-label" data-translate="Low payout threshold">Low payout threshold</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">24h</div>
            <div class="stat-label" data-translate="Fast payout processing">Fast payout processing</div>
          </div>
          <div class="hero-stat">
            <div class="stat-number">10M+</div>
            <div class="stat-label" data-translate="Monthly active viewers">Monthly active viewers</div>
          </div>
        </div>
        
        <!-- Call to Action -->
        <div class="creator-cta-hero">
          <div class="cta-content">
            <h2 data-translate="Start earning from your content today">Start earning from your content today</h2>
            <p data-translate="No upfront costs. No hidden fees. Keep 80% of everything you earn.">No upfront costs. No hidden fees. Keep 80% of everything you earn.</p>
          </div>
          <div class="cta-buttons">
            <button class="nav-button" data-nav="register" data-translate="Become a Creator">Become a Creator</button>
            <button class="nav-button nav-button-outline" data-nav="login" data-translate="Sign In">Sign In</button>
          </div>
        </div>
        
        <!-- How It Works -->
        <div class="creator-how-it-works">
          <h2 data-translate="How OMINHUB Works for Creators">🚀 How OMINHUB Works for Creators</h2>
          
          <div class="workflow-steps">
            <div class="workflow-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 data-translate="Create & Verify Your Account">Create & Verify Your Account</h3>
                <p data-translate="Sign up as a creator and complete age verification (18+). This ensures a safe platform for everyone.">Sign up as a creator and complete age verification (18+). This ensures a safe platform for everyone.</p>
                <ul class="step-details">
                  <li data-translate="Government ID verification required">Government ID verification required</li>
                  <li data-translate="Selfie matching for identity confirmation">Selfie matching for identity confirmation</li>
                  <li data-translate="Age verification is one-time only">Age verification is one-time only</li>
                  <li data-translate="Average verification time: 5-15 minutes">Average verification time: 5-15 minutes</li>
                </ul>
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 data-translate="Set Up Your Creator Profile">Set Up Your Creator Profile</h3>
                <p data-translate="Customize your profile with photos, bio, and set your subscription prices.">Customize your profile with photos, bio, and set your subscription prices.</p>
                <ul class="step-details">
                  <li data-translate="Multiple subscription tiers ($4.99 - $49.99/month)">Multiple subscription tiers ($4.99 - $49.99/month)</li>
                  <li data-translate="Custom tip menu configuration">Custom tip menu configuration</li>
                  <li data-translate="Content categories and tags">Content categories and tags</li>
                  <li data-translate="Profile customization with banners and themes">Profile customization with banners and themes</li>
                </ul>
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 data-translate="Upload & Monetize Content">Upload & Monetize Content</h3>
                <p data-translate="Start uploading videos, photos, and engage with your audience.">Start uploading videos, photos, and engage with your audience.</p>
                <ul class="step-details">
                  <li data-translate="HD video uploads (up to 4K)">HD video uploads (up to 4K)</li>
                  <li data-translate="Photo galleries and albums">Photo galleries and albums</li>
                  <li data-translate="Live streaming capabilities">Live streaming capabilities</li>
                  <li data-translate="Pay-per-view (PPV) content options">Pay-per-view (PPV) content options</li>
                </ul>
              </div>
            </div>
            
            <div class="workflow-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3 data-translate="Grow & Get Paid">Grow & Get Paid</h3>
                <p data-translate="Use our tools to grow your audience and receive monthly payouts.">Use our tools to grow your audience and receive monthly payouts.</p>
                <ul class="step-details">
                  <li data-translate="Keep 80% of all revenue">Keep 80% of all revenue</li>
                  <li data-translate="Monthly payouts with $50 minimum">Monthly payouts with $50 minimum</li>
                  <li data-translate="Multiple payment methods">Multiple payment methods</li>
                  <li data-translate="Detailed earnings analytics">Detailed earnings analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Revenue Models -->
        <div class="creator-revenue-models">
          <h2 data-translate="Multiple Ways to Earn">💰 Multiple Ways to Earn</h2>
          <p class="section-subtitle" data-translate="Diversify your income with multiple revenue streams.">Diversify your income with multiple revenue streams.</p>
          
          <div class="revenue-grid">
            <div class="revenue-model">
              <div class="revenue-icon">💎</div>
              <h3 data-translate="Monthly Subscriptions">Monthly Subscriptions</h3>
              <p data-translate="Recurring income from loyal fans who subscribe to your content.">Recurring income from loyal fans who subscribe to your content.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">80%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$4.99+</span>
                  <span class="stat-label" data-translate="Per Month">Per Month</span>
                </div>
              </div>
            </div>
            
            <div class="revenue-model">
              <div class="revenue-icon">🎬</div>
              <h3 data-translate="Pay-Per-View (PPV)">Pay-Per-View (PPV)</h3>
              <p data-translate="Charge for exclusive videos, photosets, and premium content.">Charge for exclusive videos, photosets, and premium content.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">80%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$3-100+</span>
                  <span class="stat-label" data-translate="Per View">Per View</span>
                </div>
              </div>
            </div>
            
            <div class="revenue-model">
              <div class="revenue-icon">💬</div>
              <h3 data-translate="Tips & Donations">Tips & Donations</h3>
              <p data-translate="Receive tips from fans during live streams or for custom content.">Receive tips from fans during live streams or for custom content.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">80%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$1-500+</span>
                  <span class="stat-label" data-translate="Per Tip">Per Tip</span>
                </div>
              </div>
            </div>
            
            <div class="revenue-model">
              <div class="revenue-icon">📞</div>
              <h3 data-translate="Private Shows">Private Shows</h3>
              <p data-translate="One-on-one video calls and exclusive private sessions.">One-on-one video calls and exclusive private sessions.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">80%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$5/min+</span>
                  <span class="stat-label" data-translate="Per Minute">Per Minute</span>
                </div>
              </div>
            </div>
            
            <div class="revenue-model">
              <div class="revenue-icon">🎁</div>
              <h3 data-translate="Custom Content">Custom Content</h3>
              <p data-translate="Create personalized videos and photos for individual fans.">Create personalized videos and photos for individual fans.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">80%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$20-500+</span>
                  <span class="stat-label" data-translate="Per Request">Per Request</span>
                </div>
              </div>
            </div>
            
            <div class="revenue-model">
              <div class="revenue-icon">🛒</div>
              <h3 data-translate="Merchandise">Merchandise</h3>
              <p data-translate="Sell physical products and digital merchandise to your fans.">Sell physical products and digital merchandise to your fans.</p>
              <div class="revenue-details">
                <div class="revenue-stat">
                  <span class="stat-value">70%</span>
                  <span class="stat-label" data-translate="You Keep">You Keep</span>
                </div>
                <div class="revenue-stat">
                  <span class="stat-value">$10-100+</span>
                  <span class="stat-label" data-translate="Per Item">Per Item</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Creator Tools & Features -->
        <div class="creator-tools-section">
          <h2 data-translate="Professional Creator Tools">🛠️ Professional Creator Tools</h2>
          
          <div class="tools-grid-creator">
            <div class="tool-item">
              <div class="tool-icon-large">📊</div>
              <h3 data-translate="Advanced Analytics">Advanced Analytics</h3>
              <p data-translate="Real-time insights into your earnings, audience demographics, and content performance.">Real-time insights into your earnings, audience demographics, and content performance.</p>
              <ul class="tool-features">
                <li data-translate="Daily earnings dashboard">Daily earnings dashboard</li>
                <li data-translate="Audience location and age data">Audience location and age data</li>
                <li data-translate="Content engagement metrics">Content engagement metrics</li>
                <li data-translate="Growth trend analysis">Growth trend analysis</li>
              </ul>
            </div>
            
            <div class="tool-item">
              <div class="tool-icon-large">📅</div>
              <h3 data-translate="Content Scheduling">Content Scheduling</h3>
              <p data-translate="Plan and schedule your content in advance to maintain consistent engagement.">Plan and schedule your content in advance to maintain consistent engagement.</p>
              <ul class="tool-features">
                <li data-translate="Calendar-based scheduling">Calendar-based scheduling</li>
                <li data-translate="Bulk upload and organization">Bulk upload and organization</li>
                <li data-translate="Automated posting times">Automated posting times</li>
                <li data-translate="Content expiration settings">Content expiration settings</li>
              </ul>
            </div>
            
            <div class="tool-item">
              <div class="tool-icon-large">📱</div>
              <h3 data-translate="Mobile Management">Mobile Management</h3>
              <p data-translate="Full creator functionality on iOS and Android mobile apps.">Full creator functionality on iOS and Android mobile apps.</p>
              <ul class="tool-features">
                <li data-translate="Upload content from mobile">Upload content from mobile</li>
                <li data-translate="Message fans on the go">Message fans on the go</li>
                <li data-translate="Live stream from mobile">Live stream from mobile</li>
                <li data-translate="Earnings tracking">Earnings tracking</li>
              </ul>
            </div>
            
            <div class="tool-item">
              <div class="tool-icon-large">🔒</div>
              <h3 data-translate="Security & Privacy">Security & Privacy</h3>
              <p data-translate="Advanced tools to protect your content and personal information.">Advanced tools to protect your content and personal information.</p>
              <ul class="tool-features">
                <li data-translate="Two-factor authentication">Two-factor authentication</li>
                <li data-translate="Content watermarking">Content watermarking</li>
                <li data-translate="IP blocking for specific regions">IP blocking for specific regions</li>
                <li data-translate="Download prevention">Download prevention</li>
              </ul>
            </div>
            
            <div class="tool-item">
              <div class="tool-icon-large">🎨</div>
              <h3 data-translate="Branding Tools">Branding Tools</h3>
              <p data-translate="Customize your profile and content with professional branding options.">Customize your profile and content with professional branding options.</p>
              <ul class="tool-features">
                <li data-translate="Custom profile themes">Custom profile themes</li>
                <li data-translate="Brand color schemes">Brand color schemes</li>
                <li data-translate="Logo and banner uploads">Logo and banner uploads</li>
                <li data-translate="Custom tip menu design">Custom tip menu design</li>
              </ul>
            </div>
            
            <div class="tool-item">
              <div class="tool-icon-large">📈</div>
              <h3 data-translate="Promotion Tools">Promotion Tools</h3>
              <p data-translate="Grow your audience with built-in marketing and promotion features.">Grow your audience with built-in marketing and promotion features.</p>
              <ul class="tool-features">
                <li data-translate="Referral program (5% commission)">Referral program (5% commission)</li>
                <li data-translate="Promo codes and discounts">Promo codes and discounts</li>
                <li data-translate="Social media integration">Social media integration</li>
                <li data-translate="Collaboration tools">Collaboration tools</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Payout Information -->
        <div class="creator-payouts-section">
          <h2 data-translate="Payouts & Payment Methods">💳 Payouts & Payment Methods</h2>
          
          <div class="payouts-grid">
            <div class="payout-info">
              <h3 data-translate="Payout Schedule">📅 Payout Schedule</h3>
              <div class="payout-details">
                <div class="detail-item">
                  <span class="detail-label" data-translate="Frequency:">Frequency:</span>
                  <span class="detail-value" data-translate="Monthly">Monthly</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label" data-translate="Processing:">Processing:</span>
                  <span class="detail-value" data-translate="1st of each month">1st of each month</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label" data-translate="Minimum:">Minimum:</span>
                  <span class="detail-value" data-translate="$50 balance required">$50 balance required</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label" data-translate="Timeline:">Timeline:</span>
                  <span class="detail-value" data-translate="3-5 business days after processing">3-5 business days after processing</span>
                </div>
              </div>
            </div>
            
            <div class="payout-info">
              <h3 data-translate="Payment Methods">💰 Payment Methods</h3>
              <div class="payment-methods">
                <div class="payment-method">
                  <span class="method-icon">🏦</span>
                  <span class="method-name" data-translate="Bank Transfer">Bank Transfer</span>
                  <span class="method-fee" data-translate="1-3% fee">1-3% fee</span>
                </div>
                <div class="payment-method">
                  <span class="method-icon">💎</span>
                  <span class="method-name" data-translate="Cryptocurrency">Cryptocurrency</span>
                  <span class="method-fee" data-translate="1% fee (USDT/USDC)">1% fee (USDT/USDC)</span>
                </div>
                <div class="payment-method">
                  <span class="method-icon">📱</span>
                  <span class="method-name" data-translate="E-Wallets">E-Wallets</span>
                  <span class="method-fee" data-translate="2-4% fee">2-4% fee</span>
                </div>
                <div class="payment-method">
                  <span class="method-icon">💳</span>
                  <span class="method-name" data-translate="Direct Card">Direct Card</span>
                  <span class="method-fee" data-translate="3% fee">3% fee</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tax-info">
            <h3 data-translate="Tax Information">📋 Tax Information</h3>
            <p data-translate="As an independent contractor, you are responsible for reporting your income and paying taxes according to your local laws. We provide:">As an independent contractor, you are responsible for reporting your income and paying taxes according to your local laws. We provide:</p>
            <ul>
              <li data-translate="Monthly earnings statements">Monthly earnings statements</li>
              <li data-translate="Annual 1099 forms (US creators)">Annual 1099 forms (US creators)</li>
              <li data-translate="Tax ID collection for reporting">Tax ID collection for reporting</li>
              <li data-translate="Deduction guidance documentation">Deduction guidance documentation</li>
            </ul>
          </div>
        </div>
        
        <!-- Content Guidelines -->
        <div class="creator-guidelines-section">
          <h2 data-translate="Content Guidelines & Policies">📝 Content Guidelines & Policies</h2>
          
          <div class="guidelines-comparison">
            <div class="guidelines-column">
              <h3 class="guidelines-allowed" data-translate="Allowed Content">✅ Allowed Content</h3>
              <ul class="guidelines-list">
                <li data-translate="Adult entertainment and explicit content">Adult entertainment and explicit content</li>
                <li data-translate="Nudity and sexual content (18+)">Nudity and sexual content (18+)</li>
                <li data-translate="Fetish and BDSM content (with proper tagging)">Fetish and BDSM content (with proper tagging)</li>
                <li data-translate="Educational and sex-positive content">Educational and sex-positive content</li>
                <li data-translate="Cosplay and roleplay content">Cosplay and roleplay content</li>
                <li data-translate="ASMR and sensual content">ASMR and sensual content</li>
                <li data-translate="Custom content requests">Custom content requests</li>
                <li data-translate="Live streaming with adult content">Live streaming with adult content</li>
              </ul>
            </div>
            
            <div class="guidelines-column">
              <h3 class="guidelines-prohibited" data-translate="Prohibited Content">🚫 Prohibited Content</h3>
              <ul class="guidelines-list">
                <li data-translate="Non-consensual content or revenge porn">Non-consensual content or revenge porn</li>
                <li data-translate="Minors or youth-like content">Minors or youth-like content</li>
                <li data-translate="Extreme violence or gore">Extreme violence or gore</li>
                <li data-translate="Bestiality or animal abuse">Bestiality or animal abuse</li>
                <li data-translate="Illegal activities or drug use">Illegal activities or drug use</li>
                <li data-translate="Copyright infringement">Copyright infringement</li>
                <li data-translate="Spam or misleading content">Spam or misleading content</li>
                <li data-translate="Hate speech or harassment">Hate speech or harassment</li>
              </ul>
            </div>
          </div>
          
          <div class="content-requirements">
            <h3 data-translate="Required Documentation">📋 Required Documentation</h3>
            <div class="requirements-grid">
              <div class="requirement-item">
                <h4 data-translate="Age Verification">Age Verification</h4>
                <p data-translate="All creators must verify they are 18+ with government ID">All creators must verify they are 18+ with government ID</p>
              </div>
              <div class="requirement-item">
                <h4 data-translate="Model Releases">Model Releases</h4>
                <p data-translate="Required for all persons appearing in your content">Required for all persons appearing in your content</p>
              </div>
              <div class="requirement-item">
                <h4 data-translate="Content Tagging">Content Tagging</h4>
                <p data-translate="Properly tag explicit, fetish, or sensitive content">Properly tag explicit, fetish, or sensitive content</p>
              </div>
              <div class="requirement-item">
                <h4 data-translate="Location Disclosure">Location Disclosure</h4>
                <p data-translate="Disclose filming location for tax purposes">Disclose filming location for tax purposes</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Success Stories -->
        <div class="creator-success-stories">
          <h2 data-translate="Creator Success Stories">🌟 Creator Success Stories</h2>
          
          <div class="stories-grid">
            <div class="story-card">
              <div class="story-header">
                <div class="story-avatar">👑</div>
                <div class="story-info">
                  <h4>@LunaMoon</h4>
                  <p data-translate="Joined: June 2024">Joined: June 2024</p>
                </div>
              </div>
              <div class="story-content">
                <p data-translate="I went from working a 9-5 job to earning $15,000/month on OMINHUB. The platform tools made it easy to grow my audience.">I went from working a 9-5 job to earning $15,000/month on OMINHUB. The platform tools made it easy to grow my audience.</p>
                <div class="story-stats">
                  <span data-translate="35K followers">35K followers</span>
                  <span>•</span>
                  <span data-translate="$15K/month">$15K/month</span>
                </div>
              </div>
            </div>
            
            <div class="story-card">
              <div class="story-header">
                <div class="story-avatar">⚡</div>
                <div class="story-info">
                  <h4>@ZephyrGaming</h4>
                  <p data-translate="Joined: March 2024">Joined: March 2024</p>
                </div>
              </div>
              <div class="story-content">
                <p data-translate="As a gaming content creator, OMINHUB's live streaming and tip features helped me build a sustainable income doing what I love.">As a gaming content creator, OMINHUB's live streaming and tip features helped me build a sustainable income doing what I love.</p>
                <div class="story-stats">
                  <span data-translate="22K followers">22K followers</span>
                  <span>•</span>
                  <span data-translate="$8K/month">$8K/month</span>
                </div>
              </div>
            </div>
            
            <div class="story-card">
              <div class="story-header">
                <div class="story-avatar">🎭</div>
                <div class="story-info">
                  <h4>@CosplayQueen</h4>
                  <p data-translate="Joined: January 2024">Joined: January 2024</p>
                </div>
              </div>
              <div class="story-content">
                <p data-translate="The custom content features allowed me to monetize my cosplay skills. Now I earn more in a week than I used to in a month.">The custom content features allowed me to monetize my cosplay skills. Now I earn more in a week than I used to in a month.</p>
                <div class="story-stats">
                  <span data-translate="18K followers">18K followers</span>
                  <span>•</span>
                  <span data-translate="$12K/month">$12K/month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- FAQ Section -->
        <div class="creator-faq-section">
          <h2 data-translate="Frequently Asked Questions">❓ Frequently Asked Questions</h2>
          
          <div class="faq-grid">
            <div class="faq-item">
              <h4 data-translate="How much can I realistically earn?">How much can I realistically earn?</h4>
              <p data-translate="Earnings vary based on content quality and engagement. New creators typically earn $500-$2,000/month in their first 3 months. Top creators earn $10,000-$50,000+/month.">Earnings vary based on content quality and engagement. New creators typically earn $500-$2,000/month in their first 3 months. Top creators earn $10,000-$50,000+/month.</p>
            </div>
            
            <div class="faq-item">
              <h4 data-translate="Is my personal information safe?">Is my personal information safe?</h4>
              <p data-translate="Yes. We use bank-level encryption and never share your personal information. Age verification is handled by secure third-party providers.">Yes. We use bank-level encryption and never share your personal information. Age verification is handled by secure third-party providers.</p>
            </div>
            
            <div class="faq-item">
              <h4 data-translate="Can I collaborate with other creators?">Can I collaborate with other creators?</h4>
              <p data-translate="Absolutely! We have built-in collaboration tools and split payment features for joint content creation.">Absolutely! We have built-in collaboration tools and split payment features for joint content creation.</p>
            </div>
            
            <div class="faq-item">
              <h4 data-translate="What content restrictions apply?">What content restrictions apply?</h4>
              <p data-translate="Most adult content is allowed except illegal material. See our Terms of Service for complete guidelines.">Most adult content is allowed except illegal material. See our <a href="#" data-nav="terms" data-translate="Terms of Service">Terms of Service</a> for complete guidelines.</p>
            </div>
            
            <div class="faq-item">
              <h4 data-translate="How do I promote my content?">How do I promote my content?</h4>
              <p data-translate="Use our built-in promotion tools, social media integration, and referral program. We also offer promotional credits for new creators.">Use our built-in promotion tools, social media integration, and referral program. We also offer promotional credits for new creators.</p>
            </div>
            
            <div class="faq-item">
              <h4 data-translate="What support is available?">What support is available?</h4>
              <p data-translate="24/7 creator support via email and chat. Dedicated account managers for top creators. Extensive documentation and video tutorials.">24/7 creator support via email and chat. Dedicated account managers for top creators. Extensive documentation and video tutorials.</p>
            </div>
          </div>
        </div>
        
        <!-- Final Call to Action -->
        <div class="creator-final-cta">
          <div class="final-cta-content">
            <h2 data-translate="Ready to Start Your Creator Journey?">Ready to Start Your Creator Journey?</h2>
            <p data-translate="Join thousands of creators who have transformed their passion into profit with OMINHUB.">Join thousands of creators who have transformed their passion into profit with OMINHUB.</p>
            <div class="cta-features">
              <span data-translate="✓ No upfront costs">✓ No upfront costs</span>
              <span data-translate="✓ Keep 80% of earnings">✓ Keep 80% of earnings</span>
              <span data-translate="✓ Professional tools">✓ Professional tools</span>
              <span data-translate="✓ 24/7 support">✓ 24/7 support</span>
            </div>
          </div>
          <div class="final-cta-buttons">
            <button class="nav-button large" data-nav="register" data-translate="Start Creating Today →">Start Creating Today →</button>
            <p class="cta-note" data-translate="Free to join. No credit card required.">Free to join. No credit card required.</p>
          </div>
        </div>
        
        <!-- Legal Notice -->
        <div class="creator-legal-notice">
          <p><strong data-translate="Important:">Important:</strong> <span data-translate="You must be 18+ to become a creator. All content must comply with our Terms of Service. Earnings are not guaranteed and depend on content quality and audience engagement. Consult with a tax professional regarding your income reporting obligations.">You must be 18+ to become a creator. All content must comply with our Terms of Service. Earnings are not guaranteed and depend on content quality and audience engagement. Consult with a tax professional regarding your income reporting obligations.</span></p>
        </div>
      </div>
    </section>
  `;

    // Aplicar traducciones inmediatamente después de renderizar
    const currentLang = Storage.getStored("ominhub_lang", "en");
    I18n.translateUI(currentLang);

    // Guardar textos originales para futuras traducciones
    I18n.saveOriginalTexts();

    // Add navigation wire-up
    Router.wireNavigation();
}

export const Creators = {
    renderCreators
}