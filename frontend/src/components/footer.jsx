

function Footer() {
  return (
    <div className="bg-white border-t px-6 py-4 flex items-center justify-between">
      <p className="text-grey-500 text-sm">
        © 2026 Civic Connect. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <p className="cursor-pointer hove:text-blue-600">
          Privacy Policy
        </p>
         <p className="cursor-pointer hover:text-blue-600">
          Terms & Conditions
        </p>
        <p className="cursor-pointer hover:text-blue-600">
          Help
        </p>
      </div>

    </div>
  );
}

export default Footer;
