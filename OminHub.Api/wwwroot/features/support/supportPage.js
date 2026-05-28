import { SupportFaq } from "./supportFaq.js";
import { SupportSearch } from "./supportSearch.js";
import { SupportAttachments } from "./supportAttachments.js";
import { SupportTicketForm } from "./supportTicketForm.js";

function initializeSupportPage() {

  SupportFaq.setupFaqToggle();

  SupportFaq.setupHelpCategories();

  SupportSearch.setupSupportSearch();

  SupportAttachments.setupAttachments();

  SupportTicketForm.setupTicketForm();
}

export const SupportPage = {
  initializeSupportPage
};