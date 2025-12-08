function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function renderTrees(list){
    const container = document.getElementById('treeList');
    container.innerHTML = '';
    if (!list || list.length === 0) {
        container.textContent = 'No trees to show.';
        return;
    }
    const ul = document.createElement('ul');
    list.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${escapeHtml(t.treeName)}</strong> — height: ${escapeHtml(t.height)} — types: ${escapeHtml(t.treeTypes)}`;
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    renderTrees(trees);
});
