export const FormContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="grid w-full gap-10">
		<div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
			{children}
		</div>
	</div>
)
