import { I18n } from "../../features/i18n.js";
import { Router } from "../../utils/router.js";
import { SupportPage } from "../../features/support/supportPage.js";

function renderSupport(main) {
    main.innerHTML = `
    <section class="section">
      <div class="form-card form-card-large">
        <h1 data-translate="🛟 OMINHUB Support Center">🛟 OMINHUB Support Center</h1>
        <p class="section-subtitle" data-translate="Get help with your account, content management, payments, and technical issues. Our support team is here to help you 24/7.">Get help with your account, content management, payments, and technical issues. Our support team is here to help you 24/7.</p>
        
        <!-- Support Status Banner -->
        <div class="support-status-banner">
          <div class="status-content">
            <div class="status-indicator active"></div>
            <div class="status-info">
              <h3 data-translate="✅ All Systems Operational">✅ All Systems Operational</h3>
              <p data-translate="Last updated: ${new Date().toLocaleString()}">Last updated: ${new Date().toLocaleString()}</p>
            </div>
          </div>
          <div class="status-incidents">
            <a href="#" class="incident-link" data-translate="View Incident History →">View Incident History →</a>
          </div>
        </div>
        
        <!-- Quick Help Navigation -->
        <div class="quick-help-nav">
          <h2 data-translate="🚀 Quick Help">🚀 Quick Help</h2>
          <p class="nav-description" data-translate="Select your issue category to find instant solutions:">Select your issue category to find instant solutions:</p>
          
          <div class="help-categories">
            <div class="help-category" data-category="account">
              <div class="category-icon">👤</div>
              <h3 data-translate="Account Issues">Account Issues</h3>
              <p data-translate="Login problems, verification, account recovery">Login problems, verification, account recovery</p>
            </div>
            
            <div class="help-category" data-category="content">
              <div class="category-icon">🎬</div>
              <h3 data-translate="Content & Upload">Content & Upload</h3>
              <p data-translate="Upload errors, content management, copyright">Upload errors, content management, copyright</p>
            </div>
            
            <div class="help-category" data-category="payment">
              <div class="category-icon">💰</div>
              <h3 data-translate="Payments & Earnings">Payments & Earnings</h3>
              <p data-translate="Payout issues, payment methods, earnings">Payout issues, payment methods, earnings</p>
            </div>
            
            <div class="help-category" data-category="technical">
              <div class="category-icon">🔧</div>
              <h3 data-translate="Technical Issues">Technical Issues</h3>
              <p data-translate="App problems, bugs, performance issues">App problems, bugs, performance issues</p>
            </div>
            
            <div class="help-category" data-category="safety">
              <div class="category-icon">🛡️</div>
              <h3 data-translate="Safety & Security">Safety & Security</h3>
              <p data-translate="Reporting, harassment, account security">Reporting, harassment, account security</p>
            </div>
            
            <div class="help-category" data-category="creator">
              <div class="category-icon">🎨</div>
              <h3 data-translate="Creator Tools">Creator Tools</h3>
              <p data-translate="Studio features, analytics, promotion">Studio features, analytics, promotion</p>
            </div>
          </div>
        </div>
        
        <!-- Search & Contact -->
        <div class="support-search-contact">
          <div class="search-section">
            <h2 data-translate="🔍 Search Support Articles">🔍 Search Support Articles</h2>
            <div class="search-container">
              <input type="text" id="support-search" placeholder="Type your question or keywords..." class="search-input" data-translate-placeholder="Type your question or keywords...">
              <button class="search-button" id="search-support" data-translate="Search">Search</button>
            </div>
            <div class="search-suggestions">
              <span class="suggestion-label" data-translate="Popular searches:">Popular searches:</span>
              <a href="#" class="suggestion" data-translate="How to verify my account">How to verify my account</a>
              <a href="#" class="suggestion" data-translate="Payment processing time">Payment processing time</a>
              <a href="#" class="suggestion" data-translate="Upload error solutions">Upload error solutions</a>
              <a href="#" class="suggestion" data-translate="Two-factor authentication">Two-factor authentication</a>
            </div>
          </div>
          
          <div class="contact-section">
            <h2 data-translate="📞 Contact Support">📞 Contact Support</h2>
            <div class="contact-methods">
              <div class="contact-method priority">
                <div class="method-icon">🚨</div>
                <div class="method-info">
                  <h4 data-translate="Emergency Support">Emergency Support</h4>
                  <p data-translate="For urgent safety or legal issues">For urgent safety or legal issues</p>
                  <p class="method-details"><strong data-translate="Email:">Email:</strong> emergency@ominhub.com</p>
                  <p class="method-response" data-translate="Response: 2-4 hours">Response: 2-4 hours</p>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">📧</div>
                <div class="method-info">
                  <h4 data-translate="Email Support">Email Support</h4>
                  <p data-translate="General inquiries and account issues">General inquiries and account issues</p>
                  <p class="method-details"><strong data-translate="Email:">Email:</strong> support@ominhub.com</p>
                  <p class="method-response" data-translate="Response: 24-48 hours">Response: 24-48 hours</p>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">💬</div>
                <div class="method-info">
                  <h4 data-translate="Live Chat">Live Chat</h4>
                  <p data-translate="Real-time help for technical issues">Real-time help for technical issues</p>
                  <p class="method-details"><strong data-translate="Available:">Available:</strong> <span data-translate="24/7 for active issues">24/7 for active issues</span></p>
                  <p class="method-response" data-translate="Response: Instant during hours">Response: Instant during hours</p>
                  <button class="chat-button" id="start-chat" data-translate="Start Live Chat">Start Live Chat</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- FAQ Sections -->
        <div class="faq-sections">
          <h2 data-translate="📚 Frequently Asked Questions">📚 Frequently Asked Questions</h2>
          
          <!-- Account FAQ -->
          <div class="faq-category" id="account-faq">
            <h3 class="faq-category-title" data-translate="👤 Account & Verification">👤 Account & Verification</h3>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="How do I verify my age and identity?">How do I verify my age and identity?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="Age verification is required for all creators and optional for viewers. Follow these steps:">Age verification is required for all creators and optional for viewers. Follow these steps:</p>
                <ol>
                  <li data-translate="Go to Creator → Identity Verification">Go to Creator → Identity Verification</li>
                  <li data-translate="Upload a government-issued ID (passport, driver's license)">Upload a government-issued ID (passport, driver's license)</li>
                  <li data-translate="Take a live selfie for comparison">Take a live selfie for comparison</li>
                  <li data-translate="Review and submit for processing">Review and submit for processing</li>
                </ol>
                <p><strong data-translate="Processing Time:">Processing Time:</strong> <span data-translate="Usually 5-15 minutes, up to 24 hours during peak times.">Usually 5-15 minutes, up to 24 hours during peak times.</span></p>
                <p><strong data-translate="Note:">Note:</strong> <span data-translate="We use secure third-party verification services and don't store your ID documents.">We use secure third-party verification services and don't store your ID documents.</span></p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="I forgot my password. How do I reset it?">I forgot my password. How do I reset it?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="To reset your password:">To reset your password:</p>
                <ol>
                  <li data-translate="Go to the login page">Go to the login page</li>
                  <li data-translate="Click 'Forgot Password'">Click "Forgot Password"</li>
                  <li data-translate="Enter your registered email address">Enter your registered email address</li>
                  <li data-translate="Check your email for reset instructions">Check your email for reset instructions</li>
                  <li data-translate="Follow the link to create a new password">Follow the link to create a new password</li>
                </ol>
                <p><strong data-translate="Security Note:">Security Note:</strong> <span data-translate="Password reset links expire after 1 hour for security reasons.">Password reset links expire after 1 hour for security reasons.</span></p>
                <p data-translate="If you don't receive the email, check your spam folder or contact support@ominhub.com.">If you don't receive the email, check your spam folder or contact support@ominhub.com.</p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="How do I enable two-factor authentication (2FA)?">How do I enable two-factor authentication (2FA)?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="Two-factor authentication adds an extra layer of security to your account:">Two-factor authentication adds an extra layer of security to your account:</p>
                <ol>
                  <li data-translate="Go to Account Settings → Security">Go to Account Settings → Security</li>
                  <li data-translate="Click 'Enable Two-Factor Authentication'">Click "Enable Two-Factor Authentication"</li>
                  <li data-translate="Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)">Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li data-translate="Enter the 6-digit code from your app">Enter the 6-digit code from your app</li>
                  <li data-translate="Save your backup codes in a secure location">Save your backup codes in a secure location</li>
                </ol>
                <p><strong data-translate="Recommended:">Recommended:</strong> <span data-translate="We highly recommend enabling 2FA, especially for creators with earnings.">We highly recommend enabling 2FA, especially for creators with earnings.</span></p>
                <p><strong data-translate="Lost Access?">Lost Access?</strong> <span data-translate="Contact support with your backup codes or account verification details.">Contact support with your backup codes or account verification details.</span></p>
              </div>
            </div>
          </div>
          
          <!-- Payment FAQ -->
          <div class="faq-category" id="payment-faq">
            <h3 class="faq-category-title" data-translate="💰 Payments & Earnings">💰 Payments & Earnings</h3>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="When do creators get paid?">When do creators get paid?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="Creator payouts follow this schedule:">Creator payouts follow this schedule:</p>
                <ul>
                  <li><strong data-translate="Payout Date:">Payout Date:</strong> <span data-translate="1st of each month">1st of each month</span></li>
                  <li><strong data-translate="Processing Period:">Processing Period:</strong> <span data-translate="Earnings from previous calendar month">Earnings from previous calendar month</span></li>
                  <li><strong data-translate="Minimum Balance:">Minimum Balance:</strong> <span data-translate="$50 required for payout">$50 required for payout</span></li>
                  <li><strong data-translate="Processing Time:">Processing Time:</strong> <span data-translate="3-5 business days after payout date">3-5 business days after payout date</span></li>
                </ul>
                <p><strong data-translate="Example:">Example:</strong> <span data-translate="Earnings from January are paid on February 1st, arriving in your account by February 5th-7th.">Earnings from January are paid on February 1st, arriving in your account by February 5th-7th.</span></p>
                <p><strong data-translate="Important:">Important:</strong> <span data-translate="Make sure your payment method is verified and up-to-date before the payout date.">Make sure your payment method is verified and up-to-date before the payout date.</span></p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="What payment methods are available?">What payment methods are available?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="We offer multiple payment methods for creators:">We offer multiple payment methods for creators:</p>
                <div class="payment-methods-grid">
                  <div class="payment-method-info">
                    <h5 data-translate="🏦 Bank Transfer">🏦 Bank Transfer</h5>
                    <p><strong data-translate="Fee:">Fee:</strong> <span data-translate="1-3% (varies by country)">1-3% (varies by country)</span></p>
                    <p><strong data-translate="Processing:">Processing:</strong> <span data-translate="3-5 business days">3-5 business days</span></p>
                    <p><strong data-translate="Minimum:">Minimum:</strong> <span data-translate="$50 payout">$50 payout</span></p>
                  </div>
                  
                  <div class="payment-method-info">
                    <h5 data-translate="💎 Cryptocurrency">💎 Cryptocurrency</h5>
                    <p><strong data-translate="Fee:">Fee:</strong> <span data-translate="1% (USDT/USDC)">1% (USDT/USDC)</span></p>
                    <p><strong data-translate="Processing:">Processing:</strong> <span data-translate="1-2 business days">1-2 business days</span></p>
                    <p><strong data-translate="Minimum:">Minimum:</strong> <span data-translate="$50 payout">$50 payout</span></p>
                  </div>
                  
                  <div class="payment-method-info">
                    <h5 data-translate="📱 E-Wallets">📱 E-Wallets</h5>
                    <p><strong data-translate="Fee:">Fee:</strong> <span data-translate="2-4%">2-4%</span></p>
                    <p><strong data-translate="Processing:">Processing:</strong> <span data-translate="1-3 business days">1-3 business days</span></p>
                    <p><strong data-translate="Minimum:">Minimum:</strong> <span data-translate="$50 payout">$50 payout</span></p>
                  </div>
                </div>
                <p><strong data-translate="Note:">Note:</strong> <span data-translate="Available methods vary by country. Check your account settings for available options in your region.">Available methods vary by country. Check your account settings for available options in your region.</span></p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="Why was my payment delayed or declined?">Why was my payment delayed or declined?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="Payment delays or declines can occur due to several reasons:">Payment delays or declines can occur due to several reasons:</p>
                <ul>
                  <li><strong data-translate="Verification Required:">Verification Required:</strong> <span data-translate="Tax information or identity verification incomplete">Tax information or identity verification incomplete</span></li>
                  <li><strong data-translate="Bank Issues:">Bank Issues:</strong> <span data-translate="Incorrect account details or bank restrictions">Incorrect account details or bank restrictions</span></li>
                  <li><strong data-translate="Minimum Not Met:">Minimum Not Met:</strong> <span data-translate="Balance below $50 payout threshold">Balance below $50 payout threshold</span></li>
                  <li><strong data-translate="Platform Review:">Platform Review:</strong> <span data-translate="Account under review for policy compliance">Account under review for policy compliance</span></li>
                  <li><strong data-translate="Technical Issues:">Technical Issues:</strong> <span data-translate="Payment processor delays or maintenance">Payment processor delays or maintenance</span></li>
                </ul>
                <p><strong data-translate="What to do:">What to do:</strong></p>
                <ol>
                  <li data-translate="Check your email for notifications from our payment team">Check your email for notifications from our payment team</li>
                  <li data-translate="Verify your payment details in Account Settings">Verify your payment details in Account Settings</li>
                  <li data-translate="Ensure you've completed all required verifications">Ensure you've completed all required verifications</li>
                  <li data-translate="Contact support with your transaction ID if issue persists">Contact support with your transaction ID if issue persists</li>
                </ol>
              </div>
            </div>
          </div>
          
          <!-- Content FAQ -->
          <div class="faq-category" id="content-faq">
            <h3 class="faq-category-title" data-translate="🎬 Content & Upload">🎬 Content & Upload</h3>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="What are the video upload requirements?">What are the video upload requirements?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="For optimal viewing experience, follow these upload guidelines:">For optimal viewing experience, follow these upload guidelines:</p>
                <div class="requirements-grid">
                  <div class="requirement">
                    <h5 data-translate="📁 File Format">📁 File Format</h5>
                    <p data-translate="MP4, MOV, AVI, WMV">MP4, MOV, AVI, WMV</p>
                    <p class="requirement-note" data-translate="MP4 recommended">MP4 recommended</p>
                  </div>
                  
                  <div class="requirement">
                    <h5 data-translate="🎬 Resolution">🎬 Resolution</h5>
                    <p data-translate="720p to 4K">720p to 4K</p>
                    <p class="requirement-note" data-translate="1080p optimal">1080p optimal</p>
                  </div>
                  
                  <div class="requirement">
                    <h5 data-translate="⚡ File Size">⚡ File Size</h5>
                    <p data-translate="Up to 10GB">Up to 10GB</p>
                    <p class="requirement-note" data-translate="Per video">Per video</p>
                  </div>
                  
                  <div class="requirement">
                    <h5 data-translate="⏱️ Duration">⏱️ Duration</h5>
                    <p data-translate="Up to 60 minutes">Up to 60 minutes</p>
                    <p class="requirement-note" data-translate="Live streams longer">Live streams longer</p>
                  </div>
                </div>
                <p><strong data-translate="Encoding Recommendations:">Encoding Recommendations:</strong> <span data-translate="H.264 codec, AAC audio, 30-60 fps">H.264 codec, AAC audio, 30-60 fps</span></p>
                <p><strong data-translate="Note:">Note:</strong> <span data-translate="Larger files may take longer to process. You can upload while processing continues in the background.">Larger files may take longer to process. You can upload while processing continues in the background.</span></p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="My upload keeps failing. What should I do?">My upload keeps failing. What should I do?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="If your upload is failing, try these troubleshooting steps:">If your upload is failing, try these troubleshooting steps:</p>
                <ol>
                  <li><strong data-translate="Check File Format:">Check File Format:</strong> <span data-translate="Ensure your video is in a supported format (MP4 recommended)">Ensure your video is in a supported format (MP4 recommended)</span></li>
                  <li><strong data-translate="Reduce File Size:">Reduce File Size:</strong> <span data-translate="Large files (>5GB) may fail. Try compressing or splitting the video">Large files (>5GB) may fail. Try compressing or splitting the video</span></li>
                  <li><strong data-translate="Stable Connection:">Stable Connection:</strong> <span data-translate="Use a wired connection or strong Wi-Fi for large uploads">Use a wired connection or strong Wi-Fi for large uploads</span></li>
                  <li><strong data-translate="Browser/App:">Browser/App:</strong> <span data-translate="Try a different browser or the mobile app">Try a different browser or the mobile app</span></li>
                  <li><strong data-translate="Clear Cache:">Clear Cache:</strong> <span data-translate="Clear your browser cache and cookies">Clear your browser cache and cookies</span></li>
                  <li><strong data-translate="Check Storage:">Check Storage:</strong> <span data-translate="Ensure you have available storage space">Ensure you have available storage space</span></li>
                </ol>
                <p><strong data-translate="Error Messages:">Error Messages:</strong></p>
                <ul>
                  <li><code>ERR_UPLOAD_TIMEOUT</code>: <span data-translate="Connection issue. Try better internet">Connection issue. Try better internet</span></li>
                  <li><code>ERR_FILE_TOO_LARGE</code>: <span data-translate="File exceeds 10GB limit">File exceeds 10GB limit</span></li>
                  <li><code>ERR_FORMAT_UNSUPPORTED</code>: <span data-translate="Convert to MP4 format">Convert to MP4 format</span></li>
                </ul>
                <p data-translate="If problems persist, contact support with the error message and file details.">If problems persist, contact support with the error message and file details.</p>
              </div>
            </div>
            
            <div class="faq-item">
              <div class="faq-question">
                <h4 data-translate="How do I report inappropriate content?">How do I report inappropriate content?</h4>
                <button class="faq-toggle">+</button>
              </div>
              <div class="faq-answer">
                <p data-translate="To report content that violates our policies:">To report content that violates our policies:</p>
                <ol>
                  <li data-translate="Click the 'Report' button below the video or on the user's profile">Click the "Report" button below the video or on the user's profile</li>
                  <li data-translate="Select the violation type from the list">Select the violation type from the list</li>
                  <li data-translate="Provide additional details if needed">Provide additional details if needed</li>
                  <li data-translate="Submit the report">Submit the report</li>
                </ol>
                <p><strong data-translate="Report Categories:">Report Categories:</strong></p>
                <ul>
                  <li data-translate="Illegal Content">Illegal Content</li>
                  <li data-translate="Harassment or Hate Speech">Harassment or Hate Speech</li>
                  <li data-translate="Copyright Infringement">Copyright Infringement</li>
                  <li data-translate="Underage Content">Underage Content</li>
                  <li data-translate="Spam or Scams">Spam or Scams</li>
                  <li data-translate="Other Policy Violations">Other Policy Violations</li>
                </ul>
                <p><strong data-translate="What happens next:">What happens next:</strong></p>
                <ul>
                  <li data-translate="Our moderation team reviews all reports within 24 hours">Our moderation team reviews all reports within 24 hours</li>
                  <li data-translate="You may receive an email update about the report status">You may receive an email update about the report status</li>
                  <li data-translate="Repeat violators may face account suspension or termination">Repeat violators may face account suspension or termination</li>
                </ul>
                <p><strong data-translate="Emergency Reports:">Emergency Reports:</strong> <span data-translate="For immediate threats, email emergency@ominhub.com">For immediate threats, email emergency@ominhub.com</span></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Support Ticket System -->
        <div class="support-ticket-system">
          <h2 data-translate="📋 Submit a Support Ticket">📋 Submit a Support Ticket</h2>
          <p class="ticket-description" data-translate="Can't find what you're looking for? Submit a detailed ticket and our team will help you personally.">Can't find what you're looking for? Submit a detailed ticket and our team will help you personally.</p>
          
          <div class="ticket-form">
            <div class="form-row">
              <div class="form-group">
                <label for="ticket-category" data-translate="Issue Category *">Issue Category *</label>
                <select id="ticket-category" class="ticket-select">
                  <option value="" data-translate="Select a category">Select a category</option>
                  <option value="account" data-translate="Account & Verification">Account & Verification</option>
                  <option value="technical" data-translate="Technical Issues">Technical Issues</option>
                  <option value="payment" data-translate="Payments & Earnings">Payments & Earnings</option>
                  <option value="content" data-translate="Content & Upload">Content & Upload</option>
                  <option value="safety" data-translate="Safety & Reporting">Safety & Reporting</option>
                  <option value="feature" data-translate="Feature Request">Feature Request</option>
                  <option value="other" data-translate="Other">Other</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="ticket-priority" data-translate="Priority Level">Priority Level</label>
                <select id="ticket-priority" class="ticket-select">
                  <option value="low" data-translate="Low - General Question">Low - General Question</option>
                  <option value="normal" selected data-translate="Normal - Need Help">Normal - Need Help</option>
                  <option value="high" data-translate="High - Feature Not Working">High - Feature Not Working</option>
                  <option value="urgent" data-translate="Urgent - Cannot Access Account">Urgent - Cannot Access Account</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="ticket-subject" data-translate="Subject *">Subject *</label>
              <input type="text" id="ticket-subject" placeholder="Brief description of your issue" class="ticket-input" data-translate-placeholder="Brief description of your issue">
            </div>
            
            <div class="form-group">
              <label for="ticket-description" data-translate="Description *">Description *</label>
              <textarea id="ticket-description" placeholder="Please provide detailed information about your issue. Include steps to reproduce, error messages, and what you've already tried." class="ticket-textarea" rows="6" data-translate-placeholder="Please provide detailed information about your issue. Include steps to reproduce, error messages, and what you've already tried."></textarea>
            </div>
            
            <div class="form-group">
              <label for="ticket-attachments" data-translate="Attachments (Optional)">Attachments (Optional)</label>
              <div class="attachment-upload">
                <input type="file" id="ticket-attachments" multiple style="display: none;">
                <label for="ticket-attachments" class="attachment-label" data-translate="Choose Files">Choose Files</label>
                <span class="attachment-hint" data-translate="Screenshots, error messages, or relevant files (max 5 files, 10MB each)">Screenshots, error messages, or relevant files (max 5 files, 10MB each)</span>
              </div>
              <div id="attachment-preview" class="attachment-preview"></div>
            </div>
            
            <div class="ticket-submit-section">
              <div class="ticket-note">
                <p><strong data-translate="📝 Note:">📝 Note:</strong> <span data-translate="Our average response time is 24-48 hours for normal tickets. Urgent tickets receive priority attention.">Our average response time is 24-48 hours for normal tickets. Urgent tickets receive priority attention.</span></p>
                <p data-translate="By submitting this ticket, you agree to our Terms of Service and allow us to contact you regarding this issue.">By submitting this ticket, you agree to our <a href="#" data-nav="terms">Terms of Service</a> and allow us to contact you regarding this issue.</p>
              </div>
              <button class="submit-ticket-button" id="submit-ticket" data-translate="Submit Support Ticket">Submit Support Ticket</button>
            </div>
          </div>
        </div>
        
        <!-- Community & Resources -->
        <div class="support-community">
          <h2 data-translate="🤝 Community & Additional Resources">🤝 Community & Additional Resources</h2>
          
          <div class="community-resources">
            <div class="resource-card">
              <div class="resource-icon">💬</div>
              <div class="resource-content">
                <h3 data-translate="Community Forums">Community Forums</h3>
                <p data-translate="Connect with other OMINHUB users, share tips, and get community support.">Connect with other OMINHUB users, share tips, and get community support.</p>
                <ul class="resource-links">
                  <li><a href="#" data-translate="Creator Tips & Strategies">Creator Tips & Strategies</a></li>
                  <li><a href="#" data-translate="Technical Support Discussions">Technical Support Discussions</a></li>
                  <li><a href="#" data-translate="Feature Requests & Feedback">Feature Requests & Feedback</a></li>
                  <li><a href="#" data-translate="Success Stories">Success Stories</a></li>
                </ul>
                <button class="resource-button" data-translate="Visit Forums →">Visit Forums →</button>
              </div>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">📖</div>
              <div class="resource-content">
                <h3 data-translate="Knowledge Base">Knowledge Base</h3>
                <p data-translate="Comprehensive guides and tutorials for all OMINHUB features.">Comprehensive guides and tutorials for all OMINHUB features.</p>
                <ul class="resource-links">
                  <li><a href="#" data-translate="Getting Started Guide">Getting Started Guide</a></li>
                  <li><a href="#" data-translate="Creator Handbook">Creator Handbook</a></li>
                  <li><a href="#" data-translate="Technical Documentation">Technical Documentation</a></li>
                  <li><a href="#" data-translate="Best Practices">Best Practices</a></li>
                </ul>
                <button class="resource-button" data-translate="Browse Articles →">Browse Articles →</button>
              </div>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">🎥</div>
              <div class="resource-content">
                <h3 data-translate="Video Tutorials">Video Tutorials</h3>
                <p data-translate="Step-by-step video guides for common tasks and features.">Step-by-step video guides for common tasks and features.</p>
                <ul class="resource-links">
                  <li><a href="#" data-translate="Account Setup Tutorial">Account Setup Tutorial</a></li>
                  <li><a href="#" data-translate="Content Upload Guide">Content Upload Guide</a></li>
                  <li><a href="#" data-translate="Monetization Strategies">Monetization Strategies</a></li>
                  <li><a href="#" data-translate="Studio Features Walkthrough">Studio Features Walkthrough</a></li>
                </ul>
                <button class="resource-button" data-translate="Watch Tutorials →">Watch Tutorials →</button>
              </div>
            </div>
            
            <div class="resource-card">
              <div class="resource-icon">📊</div>
              <div class="resource-content">
                <h3 data-translate="System Status">System Status</h3>
                <p data-translate="Check current platform status and incident reports.">Check current platform status and incident reports.</p>
                <div class="status-overview">
                  <div class="status-item">
                    <span class="status-label" data-translate="Platform:">Platform:</span>
                    <span class="status-value operational" data-translate="Operational">Operational</span>
                  </div>
                  <div class="status-item">
                    <span class="status-label" data-translate="Uploads:">Uploads:</span>
                    <span class="status-value operational" data-translate="Operational">Operational</span>
                  </div>
                  <div class="status-item">
                    <span class="status-label" data-translate="Payments:">Payments:</span>
                    <span class="status-value operational" data-translate="Operational">Operational</span>
                  </div>
                  <div class="status-item">
                    <span class="status-label" data-translate="Last Incident:">Last Incident:</span>
                    <span class="status-value" data-translate="3 days ago">3 days ago</span>
                  </div>
                </div>
                <button class="resource-button" data-translate="View Detailed Status →">View Detailed Status →</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Emergency Support -->
        <div class="emergency-support">
          <div class="emergency-header">
            <div class="emergency-icon">🚨</div>
            <div class="emergency-content">
              <h3 data-translate="Emergency Support Contacts">Emergency Support Contacts</h3>
              <p data-translate="For immediate safety concerns, legal issues, or critical account problems.">For immediate safety concerns, legal issues, or critical account problems.</p>
            </div>
          </div>
          
          <div class="emergency-contacts">
            <div class="emergency-contact">
              <h4 data-translate="⛑️ Immediate Safety Concerns">⛑️ Immediate Safety Concerns</h4>
              <p><strong data-translate="Email:">Email:</strong> emergency@ominhub.com</p>
              <p><strong data-translate="Response Time:">Response Time:</strong> <span data-translate="2-4 hours maximum">2-4 hours maximum</span></p>
              <p class="contact-note" data-translate="Use for threats, illegal content, or immediate danger.">Use for threats, illegal content, or immediate danger.</p>
            </div>
            
            <div class="emergency-contact">
              <h4 data-translate="⚖️ Legal & DMCA Issues">⚖️ Legal & DMCA Issues</h4>
              <p><strong data-translate="Email:">Email:</strong> legal@ominhub.com</p>
              <p><strong data-translate="DMCA:">DMCA:</strong> dmca@ominhub.com</p>
              <p class="contact-note" data-translate="For copyright claims and legal inquiries.">For copyright claims and legal inquiries.</p>
            </div>
            
            <div class="emergency-contact">
              <h4 data-translate="🌐 External Resources">🌐 External Resources</h4>
              <p><strong data-translate="Crisis Support:">Crisis Support:</strong> <span data-translate="Available 24/7 for users in need">Available 24/7 for users in need</span></p>
              <p><strong data-translate="Safety Organizations:">Safety Organizations:</strong> <span data-translate="Partnerships for user protection">Partnerships for user protection</span></p>
              <p class="contact-note" data-translate="We work with organizations to keep our community safe.">We work with organizations to keep our community safe.</p>
            </div>
          </div>
        </div>
        
        <!-- Support Hours & Policies -->
        <div class="support-policies">
          <h3 data-translate="📅 Support Hours & Policies">📅 Support Hours & Policies</h3>
          
          <div class="policies-grid">
            <div class="policy-card">
              <h4 data-translate="🕒 Support Hours">🕒 Support Hours</h4>
              <div class="hours-schedule">
                <div class="hour-item">
                  <span class="hour-label" data-translate="Email Support:">Email Support:</span>
                  <span class="hour-value" data-translate="24/7 (Response within 48h)">24/7 (Response within 48h)</span>
                </div>
                <div class="hour-item">
                  <span class="hour-label" data-translate="Live Chat:">Live Chat:</span>
                  <span class="hour-value" data-translate="24/7 for active issues">24/7 for active issues</span>
                </div>
                <div class="hour-item">
                  <span class="hour-label" data-translate="Phone Support:">Phone Support:</span>
                  <span class="hour-value" data-translate="By appointment only">By appointment only</span>
                </div>
                <div class="hour-item">
                  <span class="hour-label" data-translate="Holiday Coverage:">Holiday Coverage:</span>
                  <span class="hour-value" data-translate="Reduced staff, longer response">Reduced staff, longer response</span>
                </div>
              </div>
            </div>
            
            <div class="policy-card">
              <h4 data-translate="📋 Support Policies">📋 Support Policies</h4>
              <ul class="policy-list">
                <li data-translate="One ticket per issue please">One ticket per issue please</li>
                <li data-translate="Include all relevant information">Include all relevant information</li>
                <li data-translate="Be respectful to our agents">Be respectful to our agents</li>
                <li data-translate="Allow time for investigation">Allow time for investigation</li>
                <li data-translate="Follow up if no response in 72h">Follow up if no response in 72h</li>
              </ul>
            </div>
            
            <div class="policy-card">
              <h4 data-translate="🎯 Response Times">🎯 Response Times</h4>
              <div class="response-times">
                <div class="response-item">
                  <span class="response-label" data-translate="Emergency:">Emergency:</span>
                  <span class="response-value" data-translate="2-4 hours">2-4 hours</span>
                </div>
                <div class="response-item">
                  <span class="response-label" data-translate="Urgent:">Urgent:</span>
                  <span class="response-value" data-translate="12-24 hours">12-24 hours</span>
                </div>
                <div class="response-item">
                  <span class="response-label" data-translate="Normal:">Normal:</span>
                  <span class="response-value" data-translate="24-48 hours">24-48 hours</span>
                </div>
                <div class="response-item">
                  <span class="response-label" data-translate="Feature Requests:">Feature Requests:</span>
                  <span class="response-value" data-translate="1-2 weeks">1-2 weeks</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="support-feedback">
            <h4 data-translate="💬 Support Feedback">💬 Support Feedback</h4>
            <p data-translate="Help us improve our support service. After your issue is resolved, you'll receive a feedback survey.">Help us improve our support service. After your issue is resolved, you'll receive a feedback survey.</p>
            <p><strong data-translate="Current Satisfaction Score:">Current Satisfaction Score:</strong> <span data-translate="4.7/5.0 (Based on 2,345 reviews)">4.7/5.0 (Based on 2,345 reviews)</span></p>
          </div>
        </div>
        
        <!-- Final Note -->
        <div class="support-final-note">
          <p><strong data-translate="ℹ️ Important:">ℹ️ Important:</strong> <span data-translate="For fastest resolution, please search our knowledge base before contacting support. Most common issues have instant solutions available.">For fastest resolution, please search our knowledge base before contacting support. Most common issues have instant solutions available.</span></p>
          <p data-translate="Thank you for being part of the OMINHUB community. We're here to help you succeed.">Thank you for being part of the OMINHUB community. We're here to help you succeed.</p>
        </div>
      </div>
    </section>
  `;

    // Aplicar traducciones inmediatamente después de renderizar
    const currentLang = Storage.getStored("ominhub_lang", "en");
    I18n.translateUI(currentLang);

    // Guardar textos originales para futuras traducciones
    I18n.saveOriginalTexts();

    // Initialize support page functionality
    SupportPage.initializeSupportPage();
    Router.wireNavigation();
}

export const Support = {
    renderSupport
}