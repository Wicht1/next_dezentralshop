import Link from "next/link";
import NavItems from "./NavItems";

export default function TopBar({ locale }: { locale: string }) {
  return (
    <div
      className="sticky top-0 z-20"
      style={{ background: "#0a0a0a" }}
    >
      {/* Announcement strip */}
      <div style={{ borderBottom: "1px solid #1f1f1f" }}>
        <div className="max-w-[1280px] mx-auto px-8 h-8 flex items-center justify-between font-mono text-[11px] tracking-wide" style={{ color: "#fafafa" }}>
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-1.5"
              style={{ background: "#f39320" }}
            />
            VERSAND AB CHF 150 GRATIS · SELBSTABHOLUNG ZÜRICH
          </span>
          <span className="opacity-70">
            1 BTC ={" "}
            <span style={{ color: "#f39320" }}>CHF 98&rsquo;042</span>
            <span className="mx-2 opacity-40">·</span>
            BLOCK 889&rsquo;412
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-[1280px] mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5">
            <svg width="34" height="34" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" style={{ fillRule: "evenodd", clipRule: "evenodd" }}>
              <g transform="matrix(1.117611,0,0,1.142291,77.27331,143.990223)">
                <path fill="white" stroke="white" strokeWidth="1" d="M155.62,328.919C155.62,328.919 161.344,350.681 184.996,357.706C199.835,362.113 237.607,372.26 267.53,371.282C300.83,370.194 327.199,355.933 327.199,355.933C327.199,355.933 363.503,386.998 394.947,399.903C444.662,420.308 478.471,417.505 478.471,417.505C478.471,417.505 492.616,448.409 511.78,459.435C545.547,478.861 561.477,478.544 578.675,482.259C615.196,490.15 656.002,490.042 656.002,490.042C656.002,490.042 657.76,490.371 659.774,488.093C661.502,486.138 661.577,483.782 661.577,483.782C661.577,483.782 662.097,480.713 661.961,467.248C661.825,453.783 660.762,450.536 658.585,444.705C654.651,434.168 649.042,433.637 641.977,436.049C634.912,438.461 626.448,443.2 605.808,435.432C585.167,427.663 566.857,405.721 566.857,405.721C566.857,405.721 563.748,403.029 566.062,399.865C566.359,399.46 569.342,399.738 569.342,399.738C569.342,399.738 579.807,398.901 597.019,402.224C614.231,405.547 618.001,409.19 631.677,411.231C645.353,413.272 668.954,414.48 668.954,414.48C668.954,414.48 713.103,417.266 718.119,383.708C719.901,371.785 710.857,359.605 699.584,351.416C687.889,342.92 680.046,332.289 680.046,332.289C680.046,332.289 673.467,320.865 666.07,313.838C658.673,306.811 648.41,301.268 643.311,296.144C638.212,291.021 614.495,265.2 607.654,250.518C574.309,178.963 562.549,149.214 524.117,128.767C458.36,93.781 410.055,102.196 410.055,102.196L427.233,129.719L388.394,126.845C388.394,126.845 423.436,173.07 473.971,213.172C524.505,253.274 562.927,268.648 562.927,268.648C562.927,268.648 572.985,272.085 570.728,275.901C567.063,282.095 558.787,286.048 558.787,286.048C558.787,286.048 529.546,304.907 492.986,287.488C457.894,270.767 420.791,219.639 385.272,194.669C349.604,169.595 283.803,142.508 283.803,142.508C283.803,142.508 259.554,82.851 216.263,99.4C172.971,115.95 189.7,172.91 189.7,172.91C189.7,172.91 187.797,176.413 185.861,178.629C183.926,180.845 180.137,182.355 180.137,182.355C180.137,182.355 168.125,175.009 153.558,179.578C138.992,184.147 132.685,197.887 132.685,197.887C132.685,197.887 119.762,221.049 94.436,256.429C69.111,291.809 39.957,332.421 39.957,332.421C39.957,332.421 33.508,343.938 44.898,354.606C56.377,365.359 85.745,375.267 98.912,376.115C125.144,377.803 155.62,328.919 155.62,328.919Z" />
                <path fill="white" stroke="white" strokeWidth="1" d="M665.535,366.838C665.535,366.838 668.39,363.966 671.112,359.371C673.833,354.776 674.663,350.963 674.663,350.963C674.663,350.963 668.327,348.848 657.431,346.268C646.535,343.688 638.262,343.042 638.262,343.042C638.262,343.042 632.543,342.86 631.847,344.167C630.476,346.74 634.657,349.491 634.657,349.491C634.657,349.491 644.439,355.785 650.686,359.034C656.934,362.283 665.535,366.838 665.535,366.838Z" />
              </g>
            </svg>
            <div className="leading-none">
              <div
                className="tracking-tight"
                style={{
                  fontSize: 22,
                  color: "#f39320",
                  letterSpacing: "-0.01em",
                  fontFamily: "var(--font-logo)",
                  fontWeight: 300,
                }}
              >
                <span style={{ fontWeight: 700 }}>
                  Dezentral
                </span>
                <span>shop</span>
              </div>
              <div
                className="font-mono uppercase mt-0.5"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#6b6b6b",
                }}
              >
                Schweiz · seit 2021
              </div>
            </div>
          </Link>

          <NavItems locale={locale} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            href={`/${locale}/suche`}
            className="w-10 h-10 flex items-center justify-center"
            style={{ color: "#fafafa" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <div
            style={{ width: 1, height: 20, background: "#2a2a2a" }}
            className="mx-2"
          />
          <Link
            href={`/${locale}/warenkorb`}
            className="flex items-center gap-2 h-10 px-3"
            style={{ fontSize: 13, color: "#fafafa" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="font-mono tabular-nums">0</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
