export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-purple font-semibold mb-2">Mini Mall</h3>
          <p className="text-sm">
            Your one-stop shop for fashion & beauty.
          </p>
        </div>

        <div>
          <h3 className="text-purple font-semibold mb-2">Categories</h3>
          <ul className="space-y-1 text-sm">
            <li>Bags</li>
            <li>Shoes</li>
            <li>Clothes</li>
            <li>Cosmetics</li>
            <li>Makeup</li>
          </ul>
        </div>

        <div>
          <h3 className="text-purple font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

      </div>

      <div className="text-purple text-sm text-gray-500 pb-4">
        © {new Date().getFullYear()} Mini Mall. All rights reserved.
      </div>
    </footer>
  );
}
