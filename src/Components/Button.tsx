type TButtonProps = {
  title: string;
  className: string;
  id?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
function Button({
  title,
  className,
  id,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
}: TButtonProps) {
  return (
    <button
      id={id}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${className}`}
    >
      {LeftIcon}
      <span className=" relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>{title}</div>
      </span>
      {RightIcon}
    </button>
  );
}

export default Button;
