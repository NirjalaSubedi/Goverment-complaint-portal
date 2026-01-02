// Modal functions for document viewing
function openDocumentModal(filePath) {
    const modal = document.getElementById('documentModal');
    const iframe = document.getElementById('documentFrame');
    iframe.src = filePath;
    modal.style.display = 'block';
}

function closeDocumentModal() {
    const modal = document.getElementById('documentModal');
    const iframe = document.getElementById('documentFrame');
    modal.style.display = 'none';
    iframe.src = ''; 
}

window.onclick = function(event) {
    const modal = document.getElementById('documentModal');
    if (event.target == modal) {
        closeDocumentModal();
    }
}
