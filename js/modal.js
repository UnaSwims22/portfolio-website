function initModals() {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  
  if (modalTriggers.length === 0) {
    return;
  }
  

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      
      const modalType = this.dataset.modalType || 'image';
      
      if (modalType === 'image') {
        showImageModal(this);
      } else if (modalType === 'content') {
        showContentModal(this);
      } else if (modalType === 'project') {
        showProjectModal(this);
      }
    });
  });
  
  setupModalKeyboardNavigation();
}



function showImageModal(trigger) {
  const imageSrc = trigger.dataset.modalSrc || trigger.src || trigger.href;
  
  const imageTitle = trigger.dataset.modalTitle || trigger.alt || 'Image';
  
  const imageDescription = trigger.dataset.modalDescription || '';
  

  const modalHTML = `
    <div class="modal-backdrop" id="imageModal">
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">&times;</button>
       
        <img src="${imageSrc}" alt="${imageTitle}" class="modal-image">
        
        <div class="modal-info">
          <h3>${imageTitle}</h3>
          ${imageDescription ? `<p>${imageDescription}</p>` : ''}
        </div>
      </div>
    </div>
  `;
  

  displayModal(modalHTML, 'imageModal');
}



function showProjectModal(trigger) {
  
  const projectTitle = trigger.dataset.projectTitle || 'Project';
  const projectImage = trigger.dataset.projectImage || '';
  const projectDescription = trigger.dataset.projectDescription || '';
  const projectTags = trigger.dataset.projectTags || '';
  const projectDetails = trigger.dataset.projectDetails || '';

  let caseStudyUrl = trigger.dataset.caseStudy; 
  if (!caseStudyUrl) {
    const slug = projectTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')   
      .trim()
      .replace(/\s+/g, '-');           
    caseStudyUrl = `../html/${slug}.html`;
  }

 
  const modalHTML = `
    <div class="modal-backdrop" id="projectModal">
      <div class="modal-content modal-large">
        <button class="modal-close" aria-label="Close modal">&times;</button>
        
        ${projectImage ? `<img src="${projectImage}" alt="${projectTitle}" class="modal-image">` : ''}
        
        <div class="modal-info">
          <h2>${projectTitle}</h2>
          
          ${projectDescription ? `<p class="modal-description">${projectDescription}</p>` : ''}
          
          ${projectTags ? `
            <div class="modal-tags">
              ${projectTags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')}
            </div>
          ` : ''}
          
          ${projectDetails ? `<div class="modal-details">${projectDetails}</div>` : ''}

          <div class="modal-actions">
            <a href="${caseStudyUrl}" class="btn-case-study">
              View Full Case Study →
            </a>
          </div>
        
          </div>
      </div>
    </div>
  `;
  
  displayModal(modalHTML, 'projectModal');
}




function showContentModal(trigger) {
  const contentId = trigger.dataset.modalContent;
  const modalTitle = trigger.dataset.modalTitle || 'Details';
  const contentElement = document.getElementById(contentId);
  
  if (!contentElement) {
    console.error(`Content element with ID "${contentId}" not found`);
    return;
  }
  
  const contentClone = contentElement.cloneNode(true);

  const modalHTML = `
    <div class="modal-backdrop" id="contentModal">
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">&times;</button>
    
        <h2 class="modal-title">${modalTitle}</h2>

        <div class="modal-body">
          ${contentClone.innerHTML}
        </div>
      </div>
    </div>
  `;
  
  displayModal(modalHTML, 'contentModal');
}



function displayModal(modalHTML, modalId) {
  const existingModal = document.getElementById(modalId);
  if (existingModal) {
    existingModal.remove();
  }
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.getElementById(modalId);
  const closeButton = modal.querySelector('.modal-close');
  
  closeButton.addEventListener('click', function() {
    closeModal(modal);
  });
  
  modal.addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal(modal);
    }
  });
  

  document.body.style.overflow = 'hidden';
  

  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}



function closeModal(modal) {
  modal.classList.remove('active');
  
  setTimeout(() => {
    modal.remove();

    document.body.style.overflow = '';
  }, 300);
}



function setupModalKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.active');
      
      if (openModal) {
        closeModal(openModal);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initModals();
});


window.showImageModal = showImageModal;
window.showContentModal = showContentModal;
window.showProjectModal = showProjectModal;
window.closeModal = closeModal;
