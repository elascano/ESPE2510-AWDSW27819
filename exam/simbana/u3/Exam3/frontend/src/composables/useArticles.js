import { ref, computed } from 'vue'
import jsPDF from 'jspdf'

export function useArticles() {
  const searchTerm = ref('')
  const articles = ref([])
  const loading = ref(false)
  const error = ref('')
  const cart = ref([])

  const total = computed(() => {
    return cart.value.reduce((sum, item) => sum + (item.doi * item.quantity), 0).toFixed(2)
  })

  const searchArticles = async () => {
    if (searchTerm.value.trim().length < 1) {
      articles.value = []
      error.value = ''
      return
    }

    loading.value = true
    error.value = ''
    articles.value = []

    try {
      const response = await fetch('https://exam3-back.onrender.com/api/total')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      const searchLower = searchTerm.value.toLowerCase()

      const filtered = data.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower)
      )

      if (filtered.length > 0) {
        articles.value = filtered.map((product, index) => ({
          id: product._id || index,
          number: index + 1,
          title: product.name || 'Unnamed',
          author: product.category || 'Unknown category',
          date: product.unit || 'Unknown unit',
          journal: product.brand || 'Unknown brand',
          doi: product.price || 0
        }))
      } else {
        error.value = 'No matching products found'
      }
    } catch (err) {
      error.value = 'Error connecting to the backend'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const addToCart = (product) => {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId)
  }

  const updateQuantity = (productId, quantity) => {
    const item = cart.value.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  const generateReportPDF = () => {
    if (articles.value.length === 0) {
      alert('There are no results to generate the report')
      return
    }

    const doc = new jsPDF()
    const marginX = 10
    const maxWidth = 190
    let y = 15

    doc.setFontSize(14)
    doc.text('SCIENTIFIC ARTICLE SEARCH REPORT', marginX, y)
    y += 10

    doc.setFontSize(10)
    doc.text(`Search term: ${searchTerm.value}`, marginX, y)
    y += 6
    doc.text(
      `Generation date: ${new Date().toLocaleDateString('en-US')}`,
      marginX,
      y
    )
    y += 6
    doc.text(`Total results: ${articles.value.length}`, marginX, y)
    y += 10

    articles.value.forEach(article => {
      doc.setFontSize(11)
      const titleText = doc.splitTextToSize(
        `${article.number}. ${article.title}`,
        maxWidth
      )

      if (y + titleText.length * 6 > 280) {
        doc.addPage()
        y = 15
      }

      doc.text(titleText, marginX, y)
      y += titleText.length * 6

      doc.setFontSize(9)
      const authorsText = doc.splitTextToSize(
        `Author(s): ${article.author}`,
        maxWidth - 4
      )

      if (y + authorsText.length * 5 > 280) {
        doc.addPage()
        y = 15
      }

      doc.text(authorsText, marginX + 2, y)
      y += authorsText.length * 5

      const journalText = doc.splitTextToSize(
        `Journal: ${article.journal}`,
        maxWidth - 4
      )
      doc.text(journalText, marginX + 2, y)
      y += journalText.length * 5

      doc.text(`Date: ${article.date}`, marginX + 2, y)
      y += 5

      const doiText = doc.splitTextToSize(
        `DOI: ${article.doi}`,
        maxWidth - 4
      )
      doc.text(doiText, marginX + 2, y)
      y += doiText.length * 6 + 4
    })

    doc.save(`article_report_${searchTerm.value}_${Date.now()}.pdf`)
  }

  return {
    searchTerm,
    articles,
    loading,
    error,
    cart,
    total,
    searchArticles,
    addToCart,
    removeFromCart,
    updateQuantity,
    generateReportPDF
  }
}
