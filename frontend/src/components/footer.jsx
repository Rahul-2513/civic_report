

function Footer() {
  return (
    <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex items-center justify-between">
      <p className="text-gray-400 text-sm">
        © 2026 Civic Connect. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-sm text-gray-400">
        <p className="cursor-pointer hover:text-cyan-400">
          Privacy Policy
        </p>
         <p className="cursor-pointer hover:text-cyan-400">
          Terms & Conditions
        </p>
        <p className="cursor-pointer hover:text-cyan-400">
          Help
        </p>
      </div>

    </div>
  );
}

export default Footer;
