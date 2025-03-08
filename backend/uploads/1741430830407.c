#include<stdio.h>
#include<stdlib.h>
#include<string.h>
void main()
{
 FILE *fpin,*fpnam,*fpdef,*fparg,*fpout;
 char label[20],opcode[20],operand[20],op1[20],str1[20],str2[20],name[20],oper1[20],arg[20];
 int len,i,pos=1,position=1,pos_arg[20];
 fpin=fopen("in.txt","r");
 fpnam=fopen("nam.txt","w+");
 fpdef=fopen("def.txt","w+");
 fparg=fopen("arg.txt","w+");
 fpout=fopen("out.txt","w+");

 fscanf(fpin,"%s%s%s",label,opcode,operand);

 while(strcmp(opcode,"END")!=0)                      //1
 {
  if(strcmp(opcode,"MACRO")==0)                       //2
  {
   fprintf(fpnam,"%s\n",label);
   fseek(fpnam,SEEK_SET,0);                               //

   fprintf(fpdef,"%s\t%s\n",label,operand);
   fscanf(fpin,"%s%s%s",label,opcode,operand);

    char *token = strtok(operand, ",");
      while (token != NULL) {
        pos_arg[position++] = token[1];
        token = strtok(NULL, ",");
      }
   while(strcmp(opcode,"MEND")!=0)                    //2.1
   {
    if(operand[0]=='&')
    {


             int arg_pos;
          for (int j = 1; j <= position; j++) {

            if (pos_arg[j] == operand[1]) {
              arg_pos = j;
            }
          }
          sprintf(operand, "?%d",arg_pos);

     /**sprintf(str1,"%d",pos);
     strcpy(str2,"?");
     strcpy(operand,strcat(str2,str1));                  //
     pos=pos+1;**/

     fprintf(fpdef,"%s\t%s\n",opcode,operand);
    }
    else
    {
     fprintf(fpdef,"%s\t%s\n",opcode,operand);
    }
     fscanf(fpin,"%s%s%s",label,opcode,operand);
   }
   fprintf(fpdef,"%s\n",opcode);

  }
  else                                                        //3
  {
   fscanf(fpnam,"%s",name);
   if(strcmp(name,opcode)==0)                          //3.1
   {


   len=strlen(operand);
   for(i=0;i<len;i++)
   {
    if(operand[i]!=',')
    {
     fprintf(fparg,"%c",operand[i]);                       //
    }
    else
    {
    fprintf(fparg,"\n");
    }
   }
   fseek(fpdef,SEEK_SET,0);                           //
   fprintf(fpout,"**.%s\t%s\n",opcode,operand);
   fscanf(fpdef,"%s%s",op1,oper1);
   fseek(fparg,SEEK_SET,0);                     //
   while(strcmp(op1,"MEND")!=0)                   //3.1.1
   {
    if(oper1[0]=='?')
    {

             long pos = oper1[1] - '0';

          for(i=1;i<=pos;i++)
          {
          	fscanf(fparg, "%c", arg);
          }


     fprintf(fpout,"**%s%s",op1,arg);

    }
    else if(oper1[0]=='&')
    {
     fprintf(fpout,"**%s\t%s\n",op1,oper1);                              //?
    }
    fscanf(fpdef,"%s%s",op1,oper1);
   }

   }
   else                                                                 //3.2
   {
    fprintf(fpout,"%s\t%s\t%s\n",label,opcode,operand);
   }
  }



 fscanf(fpin,"%s%s%s",label,opcode,operand);
 }
fprintf(fpout,"%s\t%s\t%s\n",label,opcode,operand);

fclose(fpin);
fclose(fpnam);
fclose(fparg);
fclose(fpdef);
fclose(fpout);


}
