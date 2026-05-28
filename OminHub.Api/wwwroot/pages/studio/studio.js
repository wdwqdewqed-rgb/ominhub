import { Router } from "../../utils/router.js";
import { I18n } from "../../features/i18n.js";

function renderStudio(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="Creator Studio Pro">🎬 Creator Studio Pro</h1>
        <p class="section-subtitle" data-translate="Professional suite of tools to manage, grow, and optimize your creator business on OMINHUB.">Professional suite of tools to manage, grow, and optimize your creator business on OMINHUB.</p>
        
        <!-- Dashboard Overview -->
        <div class="studio-dashboard-overview">
          <div class="dashboard-header">
            <h2 data-translate="Studio Dashboard">📊 Studio Dashboard</h2>
            <div class="dashboard-controls">
              <select id="dashboard-period" class="studio-select">
                <option value="today" data-translate="Today">Today</option>
                <option value="yesterday" data-translate="Yesterday">Yesterday</option>
                <option value="7days" selected data-translate="Last 7 Days">Last 7 Days</option>
                <option value="30days" data-translate="Last 30 Days">Last 30 Days</option>
                <option value="90days" data-translate="Last 90 Days">Last 90 Days</option>
                <option value="year" data-translate="This Year">This Year</option>
              </select>
              <button class="studio-export-btn" id="export-data" data-translate="Export Data">Export Data</button>
            </div>
          </div>
          
          <div class="dashboard-metrics-grid">
            <div class="metric-card primary">
              <div class="metric-header">
                <span class="metric-label" data-translate="Estimated Earnings">Estimated Earnings</span>
                <span class="metric-change positive">+12.5%</span>
              </div>
              <div class="metric-value">$2,847.50</div>
              <div class="metric-sub" data-translate="This period • 80% creator share">This period • 80% creator share</div>
              <div class="metric-breakdown">
                <div class="breakdown-item">
                  <span data-translate="Subscriptions:">Subscriptions:</span>
                  <span>$1,850.00</span>
                </div>
                <div class="breakdown-item">
                  <span data-translate="Tips & PPV:">Tips & PPV:</span>
                  <span>$647.50</span>
                </div>
                <div class="breakdown-item">
                  <span data-translate="Custom Content:">Custom Content:</span>
                  <span>$350.00</span>
                </div>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <span class="metric-label" data-translate="Total Subscribers">Total Subscribers</span>
                <span class="metric-change positive">+5.2%</span>
              </div>
              <div class="metric-value">1,247</div>
              <div class="metric-sub" data-translate="Active paying subscribers">Active paying subscribers</div>
              <div class="metric-trend">
                <div class="trend-label" data-translate="Growth Trend">Growth Trend</div>
                <div class="trend-visual" data-translate="📈 Steady growth">📈 Steady growth</div>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <span class="metric-label" data-translate="Content Performance">Content Performance</span>
                <span class="metric-change positive">+8.7%</span>
              </div>
              <div class="metric-value">42.5K</div>
              <div class="metric-sub" data-translate="Total views this period">Total views this period</div>
              <div class="metric-details">
                <div class="detail-item">
                  <span data-translate="Avg. View Time:">Avg. View Time:</span>
                  <span>4.2 min</span>
                </div>
                <div class="detail-item">
                  <span data-translate="Engagement Rate:">Engagement Rate:</span>
                  <span>18.5%</span>
                </div>
              </div>
            </div>
            
            <div class="metric-card">
              <div class="metric-header">
                <span class="metric-label" data-translate="Audience Engagement">Audience Engagement</span>
                <span class="metric-change neutral">0.0%</span>
              </div>
              <div class="metric-value">4.8</div>
              <div class="metric-sub" data-translate="Average rating (out of 5)">Average rating (out of 5)</div>
              <div class="engagement-stats">
                <div class="stat-item">
                  <span data-translate="Messages:">Messages:</span>
                  <span>128</span>
                </div>
                <div class="stat-item">
                  <span data-translate="Comments:">Comments:</span>
                  <span>342</span>
                </div>
                <div class="stat-item">
                  <span data-translate="Shares:">Shares:</span>
                  <span>56</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-actions">
            <button class="studio-action-btn" data-action="refresh">
              <span class="action-icon">🔄</span>
              <span data-translate="Refresh Data">Refresh Data</span>
            </button>
            <button class="studio-action-btn" data-action="goals">
              <span class="action-icon">🎯</span>
              <span data-translate="Set Goals">Set Goals</span>
            </button>
            <button class="studio-action-btn" data-action="compare">
              <span class="action-icon">📊</span>
              <span data-translate="Compare Periods">Compare Periods</span>
            </button>
            <button class="studio-action-btn" data-action="insights">
              <span class="action-icon">💡</span>
              <span data-translate="Get Insights">Get Insights</span>
            </button>
          </div>
        </div>
        
        <!-- Content Management Suite -->
        <div class="studio-content-suite">
          <h2 data-translate="Content Management Suite">📁 Content Management Suite</h2>
          <p class="suite-description" data-translate="Advanced tools for organizing, scheduling, and optimizing your content library.">Advanced tools for organizing, scheduling, and optimizing your content library.</p>
          
          <div class="content-tools-grid">
            <div class="content-tool-card">
              <div class="tool-header">
                <div class="tool-icon">📹</div>
                <div class="tool-badge" data-translate="NEW">NEW</div>
              </div>
              <h3 data-translate="Video Manager Pro">Video Manager Pro</h3>
              <p data-translate="Upload, organize, and manage your video library with advanced features.">Upload, organize, and manage your video library with advanced features.</p>
              <ul class="tool-features">
                <li data-translate="4K video uploads (up to 10GB)">4K video uploads (up to 10GB)</li>
                <li data-translate="Batch upload & processing">Batch upload & processing</li>
                <li data-translate="Smart tagging & categorization">Smart tagging & categorization</li>
                <li data-translate="Content expiration settings">Content expiration settings</li>
                <li data-translate="Download statistics">Download statistics</li>
              </ul>
              <div class="tool-actions">
                <button class="studio-tool-btn" onclick="window.location.href = Router.resolveHref('channel')" data-translate="Open Manager">Open Manager</button>
                <a href="#" class="tool-learn" data-translate="Learn More →">Learn More →</a>
              </div>
            </div>
            
            <div class="content-tool-card">
              <div class="tool-header">
                <div class="tool-icon">📅</div>
                <div class="tool-badge" data-translate="PRO">PRO</div>
              </div>
              <h3 data-translate="Content Scheduler">Content Scheduler</h3>
              <p data-translate="Plan and automate your content calendar for maximum engagement.">Plan and automate your content calendar for maximum engagement.</p>
              <ul class="tool-features">
                <li data-translate="Calendar-based scheduling">Calendar-based scheduling</li>
                <li data-translate="Time zone optimization">Time zone optimization</li>
                <li data-translate="Bulk scheduling">Bulk scheduling</li>
                <li data-translate="Automated posting">Automated posting</li>
                <li data-translate="Performance predictions">Performance predictions</li>
              </ul>
              <div class="tool-actions">
                <button class="studio-tool-btn" onclick="alert('Opening Content Scheduler...')" data-translate="Open Scheduler">Open Scheduler</button>
                <a href="#" class="tool-learn" data-translate="View Tutorial →">View Tutorial →</a>
              </div>
            </div>
            
            <div class="content-tool-card">
              <div class="tool-header">
                <div class="tool-icon">🏷️</div>
                <div class="tool-badge" data-translate="AI">AI</div>
              </div>
              <h3 data-translate="AI Content Assistant">AI Content Assistant</h3>
              <p data-translate="AI-powered tools to optimize your content for better performance.">AI-powered tools to optimize your content for better performance.</p>
              <ul class="tool-features">
                <li data-translate="Title & description suggestions">Title & description suggestions</li>
                <li data-translate="Optimal posting times">Optimal posting times</li>
                <li data-translate="Content gap analysis">Content gap analysis</li>
                <li data-translate="Performance predictions">Performance predictions</li>
                <li data-translate="Trend analysis">Trend analysis</li>
              </ul>
              <div class="tool-actions">
                <button class="studio-tool-btn" onclick="alert('Launching AI Assistant...')" data-translate="Try AI Assistant">Try AI Assistant</button>
                <a href="#" class="tool-learn" data-translate="See Examples →">See Examples →</a>
              </div>
            </div>
          </div>
          
          <div class="content-library-overview">
            <h3 data-translate="Your Content Library">📚 Your Content Library</h3>
            <div class="library-stats">
              <div class="library-stat">
                <span class="stat-label" data-translate="Total Videos:">Total Videos:</span>
                <span class="stat-value">87</span>
              </div>
              <div class="library-stat">
                <span class="stat-label" data-translate="Total Photos:">Total Photos:</span>
                <span class="stat-value">324</span>
              </div>
              <div class="library-stat">
                <span class="stat-label" data-translate="Storage Used:">Storage Used:</span>
                <span class="stat-value">48.2 GB / 100 GB</span>
              </div>
              <div class="library-stat">
                <span class="stat-label" data-translate="Avg. Performance:">Avg. Performance:</span>
                <span class="stat-value">4.2/5.0</span>
              </div>
            </div>
            <button class="studio-view-all-btn" onclick="window.location.href = Router.resolveHref('channel')" data-translate="View Full Library →">View Full Library →</button>
          </div>
        </div>
        
        <!-- Audience Analytics -->
        <div class="studio-audience-analytics">
          <h2 data-translate="Advanced Audience Analytics">👥 Advanced Audience Analytics</h2>
          
          <div class="analytics-tabs">
            <div class="tab-header">
              <button class="tab-btn active" data-tab="demographics" data-translate="Demographics">Demographics</button>
              <button class="tab-btn" data-tab="behavior" data-translate="Behavior">Behavior</button>
              <button class="tab-btn" data-tab="geography" data-translate="Geography">Geography</button>
              <button class="tab-btn" data-tab="retention" data-translate="Retention">Retention</button>
            </div>
            
            <div class="tab-content active" id="demographics">
              <div class="demo-grid">
                <div class="demo-chart">
                  <h4 data-translate="Age Distribution">Age Distribution</h4>
                  <div class="chart-visual-simple">
                    <div class="chart-bar" style="width: 15%; background: #ff9900;">18-24</div>
                    <div class="chart-bar" style="width: 35%; background: #ff4f5a;">25-34</div>
                    <div class="chart-bar" style="width: 30%; background: #9c27b0;">35-44</div>
                    <div class="chart-bar" style="width: 15%; background: #2196f3;">45+</div>
                  </div>
                  <div class="chart-labels">
                    <span>15% (18-24)</span>
                    <span>35% (25-34)</span>
                    <span>30% (35-44)</span>
                    <span>15% (45+)</span>
                  </div>
                </div>
                
                <div class="demo-stats">
                  <h4 data-translate="Key Demographic Insights">Key Demographic Insights</h4>
                  <div class="demo-insights">
                    <div class="insight-item">
                      <span class="insight-label" data-translate="Primary Audience:">Primary Audience:</span>
                      <span class="insight-value" data-translate="25-34 years old">25-34 years old</span>
                    </div>
                    <div class="insight-item">
                      <span class="insight-label" data-translate="Gender Ratio:">Gender Ratio:</span>
                      <span class="insight-value" data-translate="65% Male, 35% Female">65% Male, 35% Female</span>
                    </div>
                    <div class="insight-item">
                      <span class="insight-label" data-translate="Avg. Income:">Avg. Income:</span>
                      <span class="insight-value" data-translate="$65K - $85K/year">$65K - $85K/year</span>
                    </div>
                    <div class="insight-item">
                      <span class="insight-label" data-translate="Engagement Peak:">Engagement Peak:</span>
                      <span class="insight-value" data-translate="Weekdays 7-10 PM">Weekdays 7-10 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="behavior">
              <div class="behavior-insights">
                <h4 data-translate="Viewer Behavior Patterns">Viewer Behavior Patterns</h4>
                <div class="behavior-grid">
                  <div class="behavior-item">
                    <div class="behavior-icon">⏱️</div>
                    <div class="behavior-content">
                      <h5 data-translate="Watch Time Patterns">Watch Time Patterns</h5>
                      <p data-translate="Average session duration: 22 minutes. Peak viewing on Wednesday evenings.">Average session duration: 22 minutes. Peak viewing on Wednesday evenings.</p>
                    </div>
                  </div>
                  <div class="behavior-item">
                    <div class="behavior-icon">💬</div>
                    <div class="behavior-content">
                      <h5 data-translate="Interaction Behavior">Interaction Behavior</h5>
                      <p data-translate="Most comments on tutorial content. Highest tips on exclusive content.">Most comments on tutorial content. Highest tips on exclusive content.</p>
                    </div>
                  </div>
                  <div class="behavior-item">
                    <div class="behavior-icon">📱</div>
                    <div class="behavior-content">
                      <h5 data-translate="Device Usage">Device Usage</h5>
                      <p data-translate="65% mobile, 25% desktop, 10% tablet. Mobile users engage 40% more.">65% mobile, 25% desktop, 10% tablet. Mobile users engage 40% more.</p>
                    </div>
                  </div>
                  <div class="behavior-item">
                    <div class="behavior-icon">🔄</div>
                    <div class="behavior-content">
                      <h5 data-translate="Content Preferences">Content Preferences</h5>
                      <p data-translate="Tutorial videos have highest retention. Exclusive content has highest value.">Tutorial videos have highest retention. Exclusive content has highest value.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="audience-growth">
            <h3 data-translate="Audience Growth Tools">📈 Audience Growth Tools</h3>
            <div class="growth-tools">
              <div class="growth-tool">
                <h4 data-translate="Audience Segmentation">Audience Segmentation</h4>
                <p data-translate="Create custom audience segments based on behavior and preferences.">Create custom audience segments based on behavior and preferences.</p>
                <button class="studio-small-btn" data-translate="Create Segment">Create Segment</button>
              </div>
              <div class="growth-tool">
                <h4 data-translate="Retention Analysis">Retention Analysis</h4>
                <p data-translate="Analyze subscriber retention and identify churn risks.">Analyze subscriber retention and identify churn risks.</p>
                <button class="studio-small-btn" data-translate="Analyze Retention">Analyze Retention</button>
              </div>
              <div class="growth-tool">
                <h4 data-translate="Acquisition Tracking">Acquisition Tracking</h4>
                <p data-translate="Track where new subscribers are coming from.">Track where new subscribers are coming from.</p>
                <button class="studio-small-btn" data-translate="View Sources">View Sources</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Monetization Tools -->
        <div class="studio-monetization-tools">
          <h2 data-translate="Advanced Monetization Tools">💰 Advanced Monetization Tools</h2>
          
          <div class="monetization-grid">
            <div class="monetization-card">
              <div class="monetization-header">
                <div class="monetization-icon">💎</div>
                <div class="monetization-status active" data-translate="ACTIVE">ACTIVE</div>
              </div>
              <h3 data-translate="Subscription Tiers Manager">Subscription Tiers Manager</h3>
              <p data-translate="Create and manage multiple subscription levels with different benefits.">Create and manage multiple subscription levels with different benefits.</p>
              <div class="tiers-preview">
                <div class="tier-item">
                  <span class="tier-name" data-translate="Basic">Basic</span>
                  <span class="tier-price">$4.99/mo</span>
                </div>
                <div class="tier-item">
                  <span class="tier-name" data-translate="Premium">Premium</span>
                  <span class="tier-price">$9.99/mo</span>
                </div>
                <div class="tier-item">
                  <span class="tier-name" data-translate="VIP">VIP</span>
                  <span class="tier-price">$19.99/mo</span>
                </div>
              </div>
              <button class="studio-tool-btn" onclick="alert('Opening Subscription Manager...')" data-translate="Manage Tiers">Manage Tiers</button>
            </div>
            
            <div class="monetization-card">
              <div class="monetization-header">
                <div class="monetization-icon">🎁</div>
                <div class="monetization-status" data-translate="SETUP">SETUP</div>
              </div>
              <h3 data-translate="Pay-Per-View (PPV) System">Pay-Per-View (PPV) System</h3>
              <p data-translate="Set individual prices for exclusive content and manage your PPV library.">Set individual prices for exclusive content and manage your PPV library.</p>
              <div class="ppv-stats">
                <div class="ppv-stat">
                  <span data-translate="Active PPVs:">Active PPVs:</span>
                  <span>12</span>
                </div>
                <div class="ppv-stat">
                  <span data-translate="Avg. Price:">Avg. Price:</span>
                  <span>$14.99</span>
                </div>
                <div class="ppv-stat">
                  <span data-translate="Conversion Rate:">Conversion Rate:</span>
                  <span>8.5%</span>
                </div>
              </div>
              <button class="studio-tool-btn" onclick="alert('Opening PPV Manager...')" data-translate="Manage PPVs">Manage PPVs</button>
            </div>
            
            <div class="monetization-card">
              <div class="monetization-header">
                <div class="monetization-icon">💬</div>
                <div class="monetization-status active" data-translate="ACTIVE">ACTIVE</div>
              </div>
              <h3 data-translate="Tip Menu Creator">Tip Menu Creator</h3>
              <p data-translate="Design custom tip menus with different amounts and personalized messages.">Design custom tip menus with different amounts and personalized messages.</p>
              <div class="tip-menu-preview">
                <div class="tip-item" data-translate="Thanks! ($5)">Thanks! ($5)</div>
                <div class="tip-item" data-translate="Appreciation ($10)">Appreciation ($10)</div>
                <div class="tip-item" data-translate="Super Thanks! ($25)">Super Thanks! ($25)</div>
                <div class="tip-item" data-translate="Custom Amount">Custom Amount</div>
              </div>
              <button class="studio-tool-btn" onclick="alert('Opening Tip Menu Editor...')" data-translate="Edit Tip Menu">Edit Tip Menu</button>
            </div>
          </div>
          
          <div class="earnings-forecast">
            <h3 data-translate="Earnings Forecast & Goals">📊 Earnings Forecast & Goals</h3>
            <div class="forecast-content">
              <div class="forecast-chart">
                <div class="chart-header">
                  <h4 data-translate="30-Day Earnings Forecast">30-Day Earnings Forecast</h4>
                  <span class="forecast-accuracy" data-translate="92% Accuracy">92% Accuracy</span>
                </div>
                <div class="chart-projection">
                  <div class="projection-bar" style="width: 65%;">
                    <span class="projection-label" data-translate="Projected: $3,250">Projected: $3,250</span>
                  </div>
                  <div class="projection-bar current" style="width: 100%;">
                    <span class="projection-label" data-translate="Current: $2,847">Current: $2,847</span>
                  </div>
                </div>
              </div>
              <div class="goals-setup">
                <h4 data-translate="Set Monthly Goals">Set Monthly Goals</h4>
                <div class="goal-input">
                  <input type="number" placeholder="Target earnings ($)" value="5000" data-translate-placeholder="Target earnings ($)">
                  <button class="studio-set-goal" data-translate="Set Goal">Set Goal</button>
                </div>
                <p class="goal-note" data-translate="Based on current growth, you'll reach this goal in approximately 45 days.">Based on current growth, you'll reach this goal in approximately 45 days.</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Communication Tools -->
        <div class="studio-communication-tools">
          <h2 data-translate="Advanced Communication Suite">💬 Advanced Communication Suite</h2>
          
          <div class="communication-features">
            <div class="comm-feature">
              <div class="comm-icon">📨</div>
              <div class="comm-content">
                <h3 data-translate="Mass Messaging System">Mass Messaging System</h3>
                <p data-translate="Send announcements, updates, or promotions to all your subscribers at once.">Send announcements, updates, or promotions to all your subscribers at once.</p>
                <div class="comm-stats">
                  <span data-translate="Last Sent: 2 days ago">Last Sent: 2 days ago</span>
                  <span>•</span>
                  <span data-translate="Open Rate: 78%">Open Rate: 78%</span>
                </div>
                <button class="studio-comm-btn" data-translate="Compose Message">Compose Message</button>
              </div>
            </div>
            
            <div class="comm-feature">
              <div class="comm-icon">🤖</div>
              <div class="comm-content">
                <h3 data-translate="Automated Welcome System">Automated Welcome System</h3>
                <p data-translate="Set up automated messages for new subscribers with personalized content.">Set up automated messages for new subscribers with personalized content.</p>
                <div class="comm-stats">
                  <span data-translate="Active: Yes">Active: Yes</span>
                  <span>•</span>
                  <span data-translate="Sent: 342 this month">Sent: 342 this month</span>
                </div>
                <button class="studio-comm-btn" data-translate="Configure Welcome">Configure Welcome</button>
              </div>
            </div>
            
            <div class="comm-feature">
              <div class="comm-icon">🎯</div>
              <div class="comm-content">
                <h3 data-translate="Targeted Campaigns">Targeted Campaigns</h3>
                <p data-translate="Create targeted messaging campaigns for specific audience segments.">Create targeted messaging campaigns for specific audience segments.</p>
                <div class="comm-stats">
                  <span data-translate="Active Campaigns: 3">Active Campaigns: 3</span>
                  <span>•</span>
                  <span data-translate="Avg. Conversion: 12%">Avg. Conversion: 12%</span>
                </div>
                <button class="studio-comm-btn" data-translate="Create Campaign">Create Campaign</button>
              </div>
            </div>
          </div>
          
          <div class="message-analytics">
            <h3 data-translate="Message Performance Analytics">📈 Message Performance Analytics</h3>
            <div class="message-stats-grid">
              <div class="message-stat">
                <div class="stat-value">94%</div>
                <div class="stat-label" data-translate="Delivery Rate">Delivery Rate</div>
              </div>
              <div class="message-stat">
                <div class="stat-value">78%</div>
                <div class="stat-label" data-translate="Open Rate">Open Rate</div>
              </div>
              <div class="message-stat">
                <div class="stat-value">35%</div>
                <div class="stat-label" data-translate="Reply Rate">Reply Rate</div>
              </div>
              <div class="message-stat">
                <div class="stat-value">18%</div>
                <div class="stat-label" data-translate="Conversion Rate">Conversion Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Studio Settings & Preferences -->
        <div class="studio-settings">
          <h2 data-translate="Studio Settings & Preferences">⚙️ Studio Settings & Preferences</h2>
          
          <div class="settings-categories">
            <div class="settings-category">
              <h3 data-translate="Privacy & Security">🔒 Privacy & Security</h3>
              <div class="settings-options">
                <div class="setting-option">
                  <span class="setting-label" data-translate="Two-Factor Authentication">Two-Factor Authentication</span>
                  <label class="studio-switch">
                    <input type="checkbox" checked>
                    <span class="switch-slider"></span>
                  </label>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Content Watermarking">Content Watermarking</span>
                  <label class="studio-switch">
                    <input type="checkbox" checked>
                    <span class="switch-slider"></span>
                  </label>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Download Prevention">Download Prevention</span>
                  <label class="studio-switch">
                    <input type="checkbox">
                    <span class="switch-slider"></span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="settings-category">
              <h3 data-translate="Branding & Appearance">🎨 Branding & Appearance</h3>
              <div class="settings-options">
                <div class="setting-option">
                  <span class="setting-label" data-translate="Custom Profile Theme">Custom Profile Theme</span>
                  <button class="studio-setting-btn" data-translate="Customize">Customize</button>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Brand Colors">Brand Colors</span>
                  <button class="studio-setting-btn" data-translate="Set Colors">Set Colors</button>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Logo & Banner">Logo & Banner</span>
                  <button class="studio-setting-btn" data-translate="Upload">Upload</button>
                </div>
              </div>
            </div>
            
            <div class="settings-category">
              <h3 data-translate="Notification Preferences">📋 Notification Preferences</h3>
              <div class="settings-options">
                <div class="setting-option">
                  <span class="setting-label" data-translate="New Subscriber Alerts">New Subscriber Alerts</span>
                  <label class="studio-switch">
                    <input type="checkbox" checked>
                    <span class="switch-slider"></span>
                  </label>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Tip & Payment Notifications">Tip & Payment Notifications</span>
                  <label class="studio-switch">
                    <input type="checkbox" checked>
                    <span class="switch-slider"></span>
                  </label>
                </div>
                <div class="setting-option">
                  <span class="setting-label" data-translate="Performance Reports">Performance Reports</span>
                  <select class="studio-setting-select">
                    <option data-translate="Weekly">Weekly</option>
                    <option selected data-translate="Daily">Daily</option>
                    <option data-translate="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div class="settings-actions">
            <button class="studio-save-settings" data-translate="Save All Settings">Save All Settings</button>
            <button class="studio-reset-settings" data-translate="Reset to Defaults">Reset to Defaults</button>
            <button class="studio-export-settings" data-translate="Export Settings">Export Settings</button>
          </div>
        </div>
        
        <!-- Studio Resources & Support -->
        <div class="studio-resources">
          <h2 data-translate="Studio Resources & Support">📚 Studio Resources & Support</h2>
          
          <div class="resources-grid">
            <div class="resource-card">
              <div class="resource-icon">🎓</div>
              <h3 data-translate="Video Tutorials">Video Tutorials</h3>
              <p data-translate="Step-by-step guides for all Studio features and tools.">Step-by-step guides for all Studio features and tools.</p>
              <ul class="resource-list">
                <li><a href="#" data-translate="Getting Started Guide">Getting Started Guide</a></li>
                <li><a href="#" data-translate="Advanced Analytics Tutorial">Advanced Analytics Tutorial</a></li>
                <li><a href="#" data-translate="Monetization Strategies">Monetization Strategies</a></li>
                <li><a href="#" data-translate="Audience Growth Tips">Audience Growth Tips</a></li>
              </ul>
              <button class="studio-resource-btn" data-translate="View All Tutorials →">View All Tutorials →</button>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">📖</div>
              <h3 data-translate="Documentation">Documentation</h3>
              <p data-translate="Comprehensive documentation for technical features and APIs.">Comprehensive documentation for technical features and APIs.</p>
              <ul class="resource-list">
                <li><a href="#" data-translate="API Reference Guide">API Reference Guide</a></li>
                <li><a href="#" data-translate="Best Practices">Best Practices</a></li>
                <li><a href="#" data-translate="Troubleshooting Guide">Troubleshooting Guide</a></li>
                <li><a href="#" data-translate="Feature Updates">Feature Updates</a></li>
              </ul>
              <button class="studio-resource-btn" data-translate="Open Documentation →">Open Documentation →</button>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">💬</div>
              <h3 data-translate="Creator Community">Creator Community</h3>
              <p data-translate="Connect with other creators, share tips, and collaborate.">Connect with other creators, share tips, and collaborate.</p>
              <ul class="resource-list">
                <li><a href="#" data-translate="Creator Forums">Creator Forums</a></li>
                <li><a href="#" data-translate="Weekly Webinars">Weekly Webinars</a></li>
                <li><a href="#" data-translate="Success Stories">Success Stories</a></li>
                <li><a href="#" data-translate="Collaboration Board">Collaboration Board</a></li>
              </ul>
              <button class="studio-resource-btn" data-translate="Join Community →">Join Community →</button>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">🛟</div>
              <h3 data-translate="Priority Support">Priority Support</h3>
              <p data-translate="Dedicated support for Studio Pro users.">Dedicated support for Studio Pro users.</p>
              <ul class="resource-list">
                <li><a href="#" data-translate="24/7 Chat Support">24/7 Chat Support</a></li>
                <li><a href="#" data-translate="Email Support (1h response)">Email Support (1h response)</a></li>
                <li><a href="#" data-translate="Video Call Assistance">Video Call Assistance</a></li>
                <li><a href="#" data-translate="Feature Requests">Feature Requests</a></li>
              </ul>
              <button class="studio-resource-btn" onclick="window.location.href = Router.resolveHref('support')" data-translate="Contact Support →">Contact Support →</button>
            </div>
          </div>
        </div>
        
        <!-- Studio Pro Upgrade -->
        <div class="studio-pro-upgrade">
          <div class="upgrade-content">
            <h2 data-translate="Upgrade to Studio Pro">🚀 Upgrade to Studio Pro</h2>
            <p data-translate="Unlock advanced features, priority support, and enhanced analytics with Studio Pro.">Unlock advanced features, priority support, and enhanced analytics with Studio Pro.</p>
            <div class="pro-features">
              <div class="pro-feature" data-translate="✓ Advanced Analytics Suite">✓ Advanced Analytics Suite</div>
              <div class="pro-feature" data-translate="✓ Priority Customer Support">✓ Priority Customer Support</div>
              <div class="pro-feature" data-translate="✓ AI Content Optimization">✓ AI Content Optimization</div>
              <div class="pro-feature" data-translate="✓ Custom Branding Tools">✓ Custom Branding Tools</div>
              <div class="pro-feature" data-translate="✓ Advanced Security Features">✓ Advanced Security Features</div>
              <div class="pro-feature" data-translate="✓ API Access">✓ API Access</div>
            </div>
            <div class="upgrade-pricing">
              <div class="pricing-plan">
                <h3 data-translate="Studio Pro">Studio Pro</h3>
                <div class="price">$29.99<span data-translate="/month">/month</span></div>
                <p data-translate="or $299.99/year (save 17%)">or $299.99/year (save 17%)</p>
              </div>
              <button class="studio-upgrade-btn" data-translate="Upgrade Now →">Upgrade Now →</button>
            </div>
          </div>
          <div class="upgrade-note">
            <p>💰 <strong data-translate="Tip:">Tip:</strong> <span data-translate="Studio Pro pays for itself with just 3 additional subscribers per month.">Studio Pro pays for itself with just 3 additional subscribers per month.</span></p>
          </div>
        </div>
        
        <!-- Studio Status & Updates -->
        <div class="studio-status">
          <h3 data-translate="Studio Status & Updates">📡 Studio Status & Updates</h3>
          <div class="status-grid">
            <div class="status-item online">
              <div class="status-indicator"></div>
              <div class="status-info">
                <span class="status-label" data-translate="All Systems Operational">All Systems Operational</span>
                <span class="status-time" data-translate="Last checked: Just now">Last checked: Just now</span>
              </div>
            </div>
            <div class="status-item">
              <div class="status-updates">
                <span class="update-label" data-translate="Latest Update:">Latest Update:</span>
                <span class="update-text" data-translate="AI Content Assistant released (v2.1)">AI Content Assistant released (v2.1)</span>
              </div>
              <button class="status-view-btn" data-translate="View Changelog →">View Changelog →</button>
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

    // Add interactive functionality
    setupStudioInteractivity();
    Router.wireNavigation();
}

export const Studio = {
    renderStudio
}