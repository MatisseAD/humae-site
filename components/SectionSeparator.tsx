
type SeparatorVariant = 'rounded' | 'angled' | 'wave';

interface SectionSeparatorProps {
    color: string;
    variant?: SeparatorVariant;
}

const shapePaths = {
    rounded: "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,23.5V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z",
    angled: "M0,0 L1200,0 L1200,60 L600,100 L0,60 Z",
    wave: "M0,50 C150,120 350,0 600,50 C850,100 1050,-20 1200,50 L1200,0 L0,0 Z",
};


const SectionSeparator = ({ color, variant = 'rounded' }: SectionSeparatorProps) => {
    return (
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block h-[100px] w-full"
            >
                <path
                    d={shapePaths[variant]}
                    style={{ fill: color }}
                ></path>
            </svg>
        </div>
    );
};

export default SectionSeparator;