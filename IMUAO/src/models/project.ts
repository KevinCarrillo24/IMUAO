export class Project{
  constructor(
    public projectimage:string,
    public projectname:string,
    public projectown:string,
    public projectdescription:string,
    public projecttags: Array<string>
  ){}
}
