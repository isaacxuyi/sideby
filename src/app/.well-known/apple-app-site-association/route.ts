   export const dynamic = "force-static";

   export function GET() {
     return Response.json({
       applinks: {
         details: [
           {
             appIDs: ["BR8CA9H7PH.org.sideby.app"],
             components: [{ "/": "/split/*" }, { "/": "/u/*" }],
           },
         ],
       },
     });
   }